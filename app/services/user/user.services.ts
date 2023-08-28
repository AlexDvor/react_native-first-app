import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'
import { IAnimalsData } from '~interfaces/animals.types'

type uploadImageAsyncParam = {
	uri: string
	id: number
}
interface Message {
	text: string
	sender: string
}

interface ChatMessage extends Message {
	id: string
	createdAt: Date
}

export const PATH_COLLECTION_ANIMALS = 'animals'
export const PATH_COLLECTION_USERS = 'users'
export const PATH_COLLECTION_CHAT = 'chats'
export const PATH_ITEM_OWM_ANIMALS = 'ownAnimals'
export const PATH_ITEM_FAVORITE = 'favorites'
export const PATH_ITEM_CHAT = 'chat'

export const UserService = {
	async getCollection(animalType: string) {
		try {
			const collectionRef = collection(FIREBASE_DB, PATH_COLLECTION_ANIMALS)
			let querySnapshot
			if (animalType === 'All') {
				querySnapshot = await getDocs(collectionRef)
			} else {
				const q = query(collectionRef, where('type', '==', animalType))
				querySnapshot = await getDocs(q)
			}

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
		} catch (error) {
			return []
		}
	},

	async saveAnimalToGeneralColl(data: {}): Promise<string> {
		try {
			const docRef = await addDoc(
				collection(FIREBASE_DB, PATH_COLLECTION_ANIMALS),
				{
					...data,
				}
			)
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
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_ANIMALS, animalId)
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

	async creatingOwnerProfile(userId: string): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			await setDoc(docRef, {})
		} catch (error) {
			throw error
		}
	},

	async addOwnAnimalToProfile(itemId: string, userId: string): Promise<void> {
		if (!userId) return

		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			await updateDoc(docRef, {
				[PATH_ITEM_OWM_ANIMALS]: arrayUnion(itemId),
			})
		} catch (error) {
			throw error
		}
	},

	async getOwnIdList(userId: string) {
		if (!userId) return

		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
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

	async getOwnColl(userId: string) {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.ownAnimals || []

				if (idList.length > 0) {
					const collectionRef = collection(FIREBASE_DB, PATH_COLLECTION_ANIMALS)
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

	async removeOwnAnimalFromProfile(
		itemId: string,
		userId: string
	): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const ownAnimalList = userData?.ownAnimals || []

				if (ownAnimalList.includes(itemId)) {
					await updateDoc(docRef, {
						[PATH_ITEM_OWM_ANIMALS]: arrayRemove(itemId),
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

	async toggleFavoriteList(id: string, userId: string): Promise<void> {
		if (!userId) return

		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.favorites || []
				if (idList.includes(id)) {
					await updateDoc(docRef, {
						[PATH_ITEM_FAVORITE]: arrayRemove(id),
					})
					console.log(`Remove animal with ${id} from favorite list `)
				} else {
					await updateDoc(docRef, {
						[PATH_ITEM_FAVORITE]: arrayUnion(id),
					})
					console.log(`Add animal with ${id} from favorite list `)
				}
			}
		} catch (error) {
			throw error
		}
	},

	async getFavoriteListIds(userId: string) {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.favorites || []
				return idList
			} else {
				throw new Error('You dont have own collection')
			}
		} catch (error) {
			throw error
		}
	},

	async getFavoriteColl(userId: string) {
		if (!userId) return
		try {
			const userRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const userSnapshot = await getDoc(userRef)

			if (userSnapshot.exists()) {
				const idList = userSnapshot.data()?.favorites || []
				if (idList.length > 0) {
					const collectionRef = collection(FIREBASE_DB, PATH_COLLECTION_ANIMALS)
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

	/////////// CHAT

	async getChatIdList(userId: string) {
		if (!userId) return

		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.chat || []
				return idList
			} else {
				throw new Error('You dont have id list')
			}
		} catch (error) {
			throw error
		}
	},

	async saveChatIdToProfile(chatId: string, userId: string): Promise<void> {
		if (!userId) return

		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			await updateDoc(docRef, {
				[PATH_ITEM_CHAT]: arrayUnion(chatId),
			})
		} catch (error) {
			throw error
		}
	},

	async removeChatIdFromProfile(chatId: string, userId: string): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const chatIdList = userData?.chat || []

				if (chatIdList.includes(chatId)) {
					await updateDoc(docRef, {
						[PATH_ITEM_CHAT]: arrayRemove(chatId),
					})
					console.log('ChatId removed from from Profile')
				} else {
					console.log('Item ID not found in chatIdList')
				}
			} else {
				throw new Error('User document not found')
			}
		} catch (error) {
			throw error
		}
	},

	async saveMessageToChat(
		chatID: string,
		interlocutorId: string,
		message: Message
	): Promise<string> {
		try {
			const chatRef = doc(FIREBASE_DB, 'chats', chatID)
			const messageData = {
				text: message.text,
				sender: message.sender,
				createdAt: serverTimestamp(),
			}

			const participantsData = {
				participants: [message.sender, interlocutorId],
			}

			await setDoc(chatRef, participantsData, { merge: true }) //

			const messagesRef = collection(chatRef, 'messages')
			const docRef = await addDoc(messagesRef, messageData)

			return docRef.id
		} catch (error) {
			throw error
		}
	},

	async getChatMessages(chatID: string): Promise<ChatMessage[]> {
		try {
			const chatRef = doc(FIREBASE_DB, 'chats', chatID)
			const messagesRef = collection(chatRef, 'messages')
			const querySnapshot = await getDocs(messagesRef)
			const messages = querySnapshot.docs.map((doc) => {
				const docData = doc.data()
				return {
					id: doc.id,
					text: docData.text || '',
					sender: docData.sender || '',
					createdAt: docData.createdAt
						? docData.createdAt.toDate()
						: new Date(0),
				}
			})
			return messages
		} catch (error) {
			throw error
		}
	},

	// async deleteFieldFromProfile(fieldName: string): Promise<void> {
	// 	if (!FIREBASE_PROFILE_ID) return
	// 	try {
	// 		const docRef = doc(FIREBASE_DB, PATH_СOLLECTION_USERS, FIREBASE_PROFILE_ID)
	// 		await updateDoc(docRef, {
	// 			[fieldName]: deleteField(),
	// 		})
	// 	} catch (error) {
	// 		throw error
	// 	}
	// },

	// async deleteItemFromProfile(
	// 	fromArray: string,
	// 	itemId: string
	// ): Promise<void> {
	// 	if (!FIREBASE_PROFILE_ID) return
	// 	try {
	// 		const docRef = doc(FIREBASE_DB, PATH_СOLLECTION_USERS, FIREBASE_PROFILE_ID)
	// 		//delete obj with id from array
	// 		await updateDoc(docRef, {
	// 			animals: arrayRemove({ id: '2', name: 'Miki' }),
	// 		})

	// 		// delete item from array

	// 		// 	await updateDoc(washingtonRef, {
	// 		// 		test: arrayRemove("east_coast")
	// 		//   });
	// 	} catch (error) {
	// 		console.log('❌ ~ error:', error)
	// 		throw error
	// 	}
	// },
}
