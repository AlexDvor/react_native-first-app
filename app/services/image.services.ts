import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'
import { IAnimalsData } from '~interfaces/animals.types'

import { Constants } from './config.services'
import { UserService } from './user.services'

const { STORAGE_AVATAR_USERS, STORAGE_IMAGE_ANIMALS, COLLECTION_ANIMALS } =
	Constants

export type uploadImageAsyncParam = {
	uri: string
	id: string
}

const COMPRESS_SIZE = 0.8

export const ImageService = {
	async uploadAvatarImage(imageRef: uploadImageAsyncParam): Promise<string> {
		if (imageRef === null) {
			return 'undefined'
		}

		try {
			const manipulatedImage = await manipulateAsync(
				imageRef.uri,
				[{ resize: { width: 800 } }],
				{ compress: COMPRESS_SIZE, format: SaveFormat.JPEG }
			)
			const response = await fetch(manipulatedImage.uri)
			const blob = await response.blob()
			const storageRef = ref(
				FIREBASE_STORAGE,
				`${STORAGE_AVATAR_USERS}/${imageRef.id}`
			)
			const snapshot = await uploadBytes(storageRef, blob)
			const downloadURL = await getDownloadURL(snapshot.ref)
			await this.addOwnAvatarToAnimalProfile(downloadURL, imageRef.id)
			return downloadURL
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
					{ compress: COMPRESS_SIZE, format: SaveFormat.JPEG }
				)
				const response = await fetch(manipulatedImage.uri)
				const blob = await response.blob()
				const storageRef = ref(
					FIREBASE_STORAGE,
					`${STORAGE_IMAGE_ANIMALS}/${Date.now()}`
				)
				const snapshot = await uploadBytes(storageRef, blob)
				const downloadURL = await getDownloadURL(snapshot.ref)
				pathArray.push(downloadURL)
			}
			return pathArray
		} catch (error) {
			throw error
		}
	},

	async findAvatarByName(avatarName: string): Promise<string | null> {
		try {
			const storageRef = ref(FIREBASE_STORAGE, STORAGE_AVATAR_USERS)
			const listResult = await listAll(storageRef)

			for (const item of listResult.items) {
				const itemName = item.name
				if (itemName === avatarName) {
					const downloadURL = await getDownloadURL(item)
					return downloadURL
				}
			}

			return null
		} catch (error) {
			throw error
		}
	},

	async addOwnAvatarToAnimalProfile(urlAvatar: string, idUser: string) {
		try {
			const { user } = await UserService.getUserRef(idUser)
			const animalIds = user.ownAnimals

			if (animalIds.length > 0) {
				const collectionRef = collection(FIREBASE_DB, COLLECTION_ANIMALS)
				const querySnapshot = await getDocs(collectionRef)
				const data: IAnimalsData[] = querySnapshot.docs
					.map((doc) => ({ ...doc.data(), id: doc.id }))
					.filter((item) => animalIds.includes(item.id)) as IAnimalsData[]

				const updatePromises = data.map(async (item) => {
					const docRef = doc(FIREBASE_DB, COLLECTION_ANIMALS, item.id)
					await updateDoc(docRef, {
						owner: { ...item.owner, avatar: urlAvatar },
					})
				})

				await Promise.all(updatePromises)
				return
			}
		} catch (error) {
			throw error
		}
	},
}
