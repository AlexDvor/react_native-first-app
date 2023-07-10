import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import {
	DocumentData,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	deleteField,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import {
	FIREBASE_AUTH,
	FIREBASE_DB,
	FIREBASE_STORAGE,
} from '~config/firebaseConfig'
import { IAnimalsData } from '~interfaces/animals.types'

type uploadImageAsyncParam = {
	uri: string
	id: number
}

export const PATH_NAME_ITEMS = 'animals'
export const PATH_NAME_USERS = 'users'
export const PATH_OWN_ITEMS = 'ownAnimals'
const PROFILE_ID = FIREBASE_AUTH.currentUser?.uid

export const UserService = {
	async getAllCollection() {
		try {
			const collectionRef = collection(FIREBASE_DB, PATH_NAME_ITEMS)
			const querySnapshot = await getDocs(collectionRef)
			const data: IAnimalsData[] = querySnapshot.docs.map((doc) => {
				const docData = doc.data()
				const docId = doc.id
				const formattedData: IAnimalsData = {
					id: docId,
					name: docData.name || '',
					color: docData.color || '',
					age: docData.age || { year: 0, month: 0, day: 0 },
					breed: docData.breed || '',
					imageUri: docData.imageUri || [],
					type: docData.type || '',
					description: docData.description || '',
					gender: docData.gender || '',
					weight: docData.weight || 0,
					vaccine: docData.vaccine || false,
					owner: docData.owner || {},
					...docData,
				}
				return formattedData
			})

			return data
		} catch (error) {}
	},

	async saveAnimalToGeneralColl(data: {}): Promise<string> {
		try {
			const docRef = await addDoc(collection(FIREBASE_DB, PATH_NAME_ITEMS), {
				...data,
			})
			return docRef.id
		} catch (error) {
			throw error
		}
	},

	async removeAnimalFromGeneralColl(animalId: string): Promise<void> {
		try {
			if (!animalId) {
				throw new Error('Animal ID is required')
			}
			const docRef = doc(FIREBASE_DB, PATH_NAME_ITEMS, animalId)
			const docSnapshot = await getDoc(docRef)

			if (!docSnapshot.exists()) {
				throw new Error('Animal document not found')
			}

			await deleteDoc(docRef)

			console.log('Animal removed from general collection')
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

	//////// removing and adding own animals to own animal list

	async creatingOwnerProfile(data?: {}): Promise<void> {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			await setDoc(docRef, {})
		} catch (error) {
			throw error
		}
	},

	async addOwnAnimalToProfile(itemId: string): Promise<void> {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			await updateDoc(docRef, {
				[PATH_OWN_ITEMS]: arrayUnion(itemId),
			})
		} catch (error) {
			throw error
		}
	},

	async getOwnIdList() {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.ownAnimals || []
				return idList
			} else {
				throw new Error('You dont have own collection')
			}
		} catch (error) {
			throw error
		}
	},

	async getOwnColl() {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.ownAnimals || []

				if (idList.length > 0) {
					const collectionRef = collection(FIREBASE_DB, PATH_NAME_ITEMS)
					const querySnapshot = await getDocs(collectionRef)
					const data = querySnapshot.docs
						.map((doc) => ({ ...doc.data(), id: doc.id }))
						.filter((item) => idList.includes(item.id))
					return data
				}
			} else {
				throw new Error('You dont have own collection')
			}
			return []
		} catch (error) {
			throw error
		}
	},

	async removeOwnAnimalFromProfile(itemId: string): Promise<void> {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const ownAnimalList = userData?.ownAnimals || []

				if (ownAnimalList.includes(itemId)) {
					await updateDoc(docRef, {
						[PATH_OWN_ITEMS]: arrayRemove(itemId),
					})
					await this.removeAnimalFromGeneralColl(itemId)
					console.log('Animal removed from from Profile')
				} else {
					console.log('Item ID not found in ownAnimalList')
				}
			} else {
				throw new Error('User document not found')
			}
		} catch (error) {
			throw error
		}
	},

	////////

	/////////// removing and adding animals to favorite list

	async addOFavoriteItemToProfile(id: string): Promise<void> {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			await setDoc(docRef, { favorite: [id] }, { merge: true })
		} catch (error) {
			throw error
		}
	},

	async deleteFieldFromProfile(fieldName: string): Promise<void> {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			await updateDoc(docRef, {
				[fieldName]: deleteField(),
			})
		} catch (error) {
			throw error
		}
	},

	async deleteItemFromProfile(
		fromArray: string,
		itemId: string
	): Promise<void> {
		if (!PROFILE_ID) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
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

	async getFavoriteColl() {
		if (!PROFILE_ID) return
		try {
			const userRef = doc(FIREBASE_DB, PATH_NAME_USERS, PROFILE_ID)
			const userSnapshot = await getDoc(userRef)

			if (userSnapshot.exists()) {
				const idList = userSnapshot.data()?.animals || []
				if (idList.length > 0) {
					const collectionRef = collection(FIREBASE_DB, PATH_NAME_ITEMS)
					const querySnapshot = await getDocs(collectionRef)
					const data = querySnapshot.docs
						.map((doc) => ({ ...doc.data(), id: doc.id }))
						.filter((item) => idList.includes(item.id))
					return data
				} else {
					console.log('No animals in favorites')
					return []
				}
			} else {
				console.log('User document not found')
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	},
}
