import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'

const uploadImageAsync = async (uri: string) => {
	try {
		const manipulatedImage = await manipulateAsync(
			uri,
			[{ resize: { width: 800 } }],
			{ compress: 0.1, format: SaveFormat.JPEG }
		)
		const response = await fetch(manipulatedImage.uri)
		const blob = await response.blob()
		const storageRef = ref(FIREBASE_STORAGE, `images/${Date.now()}`)
		const snapshot = await uploadBytes(storageRef, blob)
		const downloadURL = await getDownloadURL(snapshot.ref)

		return downloadURL
	} catch (error) {
		throw error
	}
}

const saveAnimalData = async (animalData, imageUrl) => {
	try {
		// const animalRef = .collection('animals').doc()
		// await animalRef.set({
		// 	...animalData,
		// 	imageUrl,
		// })

		const docRef = await addDoc(collection(FIREBASE_DB, 'animals'), {
			animalData,
			imageUrl,
		})
		console.log('Animal data was saved successfully with ID', docRef.id)
	} catch (error) {
		throw error
	}
}

export { uploadImageAsync, saveAnimalData }
