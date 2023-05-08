import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'

const uploadImageAsync = async (imageUriArray: string[]) => {
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
}

// const uploadImageAsync = async (imageUriArray: []) => {
// 	if (imageUriArray.length === 0) {
// 		console.log('You cannot submit the form without any photo ')
// 		return
// 	}

// 	const pathArray: string[] = []

// 	try {
// 		imageUriArray.map(async (item) => {
// 			const manipulatedImage = await manipulateAsync(
// 				item.uri,
// 				[{ resize: { width: 800 } }],
// 				{ compress: 0.1, format: SaveFormat.JPEG }
// 			)
// 			const response = await fetch(manipulatedImage.uri)
// 			const blob = await response.blob()
// 			const storageRef = ref(FIREBASE_STORAGE, `images/${Date.now()}`)
// 			const snapshot = await uploadBytes(storageRef, blob)
// 			const downloadURL = await getDownloadURL(snapshot.ref)
// 			pathArray.push(downloadURL)
// 		})
// 		return pathArray
// 	} catch (error) {
// 		throw error
// 	}
// }

// const uploadImageAsync = async (uri) => {
//

//
// 	try {
// 		const manipulatedImage = await manipulateAsync(
// 			uri,
// 			[{ resize: { width: 800 } }],
// 			{ compress: 0.1, format: SaveFormat.JPEG }
// 		)
// 		const response = await fetch(manipulatedImage.uri)
// 		const blob = await response.blob()
// 		const storageRef = ref(FIREBASE_STORAGE, `images/${Date.now()}`)
// 		const snapshot = await uploadBytes(storageRef, blob)
// 		const downloadURL = await getDownloadURL(snapshot.ref)

// 		return downloadURL
// 	} catch (error) {
// 		throw error
// 	}
// }
const saveAnimalData = async (animalData: {}) => {
	console.log('❌ ~ saveAnimalData:', animalData)
	try {
		// const animalRef = .collection('animals').doc()
		// await animalRef.set({
		// 	...animalData,
		// 	imageUrl,
		// })

		const docRef = await addDoc(collection(FIREBASE_DB, 'animals'), {
			animalData,
		})
		console.log('Animal data was saved successfully with ID', docRef.id)
	} catch (error) {
		throw error
	}
}

export { uploadImageAsync, saveAnimalData }
