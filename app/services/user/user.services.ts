import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import {
	addDoc,
	arrayRemove,
	collection,
	deleteField,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'
import { IAnimalsData } from '~interfaces/animals.types'

type uploadImageAsyncParam = {
	uri: string
	id: number
}

const PATH_NAME_ITEMS = 'animals'
const PATH_NAME_USERS = 'users'

export const UserService = {
	async saveItemToCollectionAnimals(data: {}): Promise<string> {
		try {
			const docRef = await addDoc(collection(FIREBASE_DB, PATH_NAME_ITEMS), {
				data,
			})
			return docRef.id
		} catch (error) {
			throw error
		}
	},

	async uploadImageAsync(
		imageUriArray: uploadImageAsyncParam[]
	): Promise<string[]> {
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

	async creatingOwnerProfile(userId: string, data?: {}): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, userId)
			await setDoc(docRef, {})
		} catch (error) {
			throw error
		}
	},

	async addDataToProfile(userId: string, data: {}): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, userId)
			await setDoc(docRef, data)
		} catch (error) {
			throw error
		}
	},

	async deleteFieldFromProfile(
		userId: string,
		fieldName: string
	): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, userId)
			await updateDoc(docRef, {
				[fieldName]: deleteField(),
			})
		} catch (error) {
			throw error
		}
	},

	async deleteItemFromProfile(
		userId: string,
		fromArray: string,
		itemId: string
	): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, userId)
			//delete obj with id from array
			await updateDoc(docRef, {
				animals: arrayRemove({ id: '2', name: 'Miki' }),
			})

			// delete item from array

			// 	await updateDoc(washingtonRef, {
			// 		test: arrayRemove("east_coast")
			//   });
		} catch (error) {
			console.log('❌ ~ error:', error)
			throw error
		}
	},

	async getFavoriteCollection(): Promise<IAnimalsData[]> {
		try {
			const collectionRef = collection(FIREBASE_DB, PATH_NAME_ITEMS)
			const querySnapshot = await getDocs(collectionRef)
			const data = querySnapshot.docs.map((doc) => {
				const docData = doc.data().data
				const docId = doc.id
				return { ...docData, id: docId }
			})
			console.log('❌ ~ data:', data)
			return data
		} catch (error) {
			console.log(error)
			throw error
		}
	},
}

// async saveItemToCollectionAnimals(data: {}) {
// 	try {
// 		const docRef = await addDoc(collection(FIREBASE_DB, PATH_NAME_ITEMS), {
// 			data,
// 		})

// 		const docSnap = await getDoc(docRef)
// 		if (docSnap.exists()) {
// 			const createdItem = docSnap.data().data
// 			return createdItem
// 		} else {
// 			return null
// 		}

// 		return docRef.id
// 	} catch (error) {
// 		throw error
// 	}
