import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Image, ImageSourcePropType } from 'react-native'
import { FIREBASE_AUTH } from '~config/firebaseConfig'
import {
	FIREBASE_DB,
	FIREBASE_PROFILE_ID,
	FIREBASE_STORAGE,
} from '~config/firebaseConfig'
import { TAnimalsData } from '~data/animals'
import {
	PATH_NAME_ITEMS,
	PATH_NAME_USERS,
	PATH_OWN_ITEMS,
} from '~services/user/user.services'

export const FireBaseDefaultData = {
	async uploadImages(imgArray: string[]) {
		const imageUriArray = imgArray.map((path) =>
			Image.resolveAssetSource(path as ImageSourcePropType)
		)

		const pathArray: string[] = []

		try {
			for (const item of imageUriArray) {
				const manipulatedImage = await manipulateAsync(
					item.uri,
					[{ resize: { width: 800 } }],
					{ compress: 0.1, format: SaveFormat.JPEG }
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

	async submitData(data: {}) {
		try {
			const docRef = await addDoc(collection(FIREBASE_DB, PATH_NAME_ITEMS), {
				...data,
			})
			return docRef.id
		} catch (error) {
			console.log('submitData', error)
		}
	},

	async addAnimalIdToUserProfile(animalId: string | undefined) {
		if (!FIREBASE_PROFILE_ID) return

		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, FIREBASE_PROFILE_ID)
			await updateDoc(docRef, {
				[PATH_OWN_ITEMS]: arrayUnion(animalId),
			})
		} catch (error) {
			throw error
		}
	},

	async createDefaultDataBase(animalsData: TAnimalsData[]) {
		if (!FIREBASE_PROFILE_ID) return
		try {
			for (const animal of animalsData) {
				const imageUrl = await this.uploadImages(animal.imageUri)
				const newAnimal = {
					...animal,
					imageUri: imageUrl,
					owner: {
						id: FIREBASE_PROFILE_ID,
						name: FIREBASE_AUTH.currentUser?.displayName,
						avatar: FIREBASE_AUTH.currentUser?.photoURL || null,
					},
				}

				const animalId = await this.submitData(newAnimal)
				await this.addAnimalIdToUserProfile(animalId)
			}
		} catch (error) {
			console.log('createDefaultDataBase', error)
		}
	},
}
