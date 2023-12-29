import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FIREBASE_STORAGE } from '~config/firebaseConfig'

import { Constants } from './config.services'

const { STORAGE_AVATAR_USERS, STORAGE_IMAGE_ANIMALS } = Constants

type uploadImageAsyncParam = {
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
}
