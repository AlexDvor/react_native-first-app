import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Image, ImageSourcePropType } from 'react-native'
import { FIREBASE_STORAGE } from '~config/firebaseConfig'
import { FIREBASE_AUTH } from '~config/firebaseConfig'
import { TAnimalsData } from '~data/animals'

const uploadImagesToFireStore = async (imgArray: string[]) => {
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
}

export const createDefaultDataBase = async (
	animalsData: TAnimalsData[],
	userId: string
) => {
	const data = []
	try {
		for (const animal of animalsData) {
			// const imageUrl = await uploadImagesToFireStore(animal.imageUri)
			const imageUrl = ['1', '2']
			const newAnimal = {
				...animal,
				imageUri: imageUrl,
				owner: {
					id: userId,
					name: FIREBASE_AUTH.currentUser?.displayName,
					avatar: FIREBASE_AUTH.currentUser?.photoURL || null,
				},
			}
			data.push(newAnimal)
		}
		return data
	} catch (error) {}
}
