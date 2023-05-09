import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'

type uploadImageAsyncParam = {
	uri: string
	id: number
}

const PATH_NAME_ITEMS = 'animals'
const PATH_NAME_USERS = 'users'

export const UserService = {
	async saveItemToCollectionAnimals(data: {}) {
		try {
			const docRef = await addDoc(collection(FIREBASE_DB, PATH_NAME_ITEMS), {
				data,
			})
			return docRef.id
		} catch (error) {
			throw error
		}
	},

	async uploadImageAsync(imageUriArray: uploadImageAsyncParam[]) {
		if (imageUriArray.length === 0) {
			console.log('You cannot submit the form without any photo ')
			return []
		}

		const pathArray: string[] = []

		try {
			for (const item of imageUriArray) {
				const manipulatedImage = await manipulateAsync(
					item.uri,
					[{ resize: { width: 800 } }],
					{ compress: 0.8, format: SaveFormat.JPEG }
				)
				const response = await fetch(manipulatedImage.uri)
				const blob = await response.blob()
				const storageRef = ref(FIREBASE_STORAGE, `images/${Date.now()}`)
				const snapshot = await uploadBytes(storageRef, blob)
				const downloadURL = await getDownloadURL(snapshot.ref)
				pathArray.push(downloadURL)
			}
			return pathArray
		} catch (error) {
			throw error
		}
	},

	async creatingOwnerProfile(userId: string, data?: {}) {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, userId)
			await setDoc(docRef, {})
		} catch (error) {
			throw error
		}
	},

	async addDataToProfile(userId: string, data: {}) {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, userId)
			await setDoc(docRef, data)
		} catch (error) {
			throw error
		}
	},
}
