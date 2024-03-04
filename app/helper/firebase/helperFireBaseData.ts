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
import {
	FIREBASE_AUTH,
	FIREBASE_DB,
	FIREBASE_STORAGE,
} from '~config/firebaseConfig'
import { TestAnimalTypes } from '~data/animals'
import { Constants } from '~services/config.services'

const { COLLECTION_USERS, COLLECTION_ANIMALS, ITEM_OWM_ANIMALS } = Constants

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

	async submitData(data: {}) {
		try {
			const docRef = await addDoc(collection(FIREBASE_DB, COLLECTION_ANIMALS), {
				...data,
			})
			return docRef.id
		} catch (error) {
			console.log('submitData', error)
		}
	},

	async addAnimalIdToUserProfile(animalId: string | undefined, userId: string) {
		if (!userId) return

		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			await updateDoc(docRef, {
				[ITEM_OWM_ANIMALS]: arrayUnion(animalId),
			})
		} catch (error) {
			throw error
		}
	},

	async createDefaultDataBase(animalsData: TestAnimalTypes[], userId: string) {
		if (!userId) return
		try {
			for (const animal of animalsData) {
				const imageUrl = await this.uploadImages(animal.imageUri)
				const newAnimal = {
					...animal,
					imageUri: imageUrl,
					owner: {
						id: userId,
						name: FIREBASE_AUTH.currentUser?.displayName,
						avatar: FIREBASE_AUTH.currentUser?.photoURL || null,
					},
				}

				const animalId = await this.submitData(newAnimal)
				await this.addAnimalIdToUserProfile(animalId, userId)
			}
		} catch (error) {
			console.log('createDefaultDataBase', error)
		}
	},
}
