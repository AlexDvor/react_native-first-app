import { formatDistanceToNow } from 'date-fns'
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import {
	Unsubscribe,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	startAfter,
	startAt,
	updateDoc,
	where,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import uuid from 'react-native-uuid'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'
import { IAnimalsData } from '~interfaces/animals.types'
import { IChatScreenMessage, IMessageList } from '~interfaces/message.types'
import { IUserData } from '~interfaces/user.types'

type uploadImageAsyncParam = {
	uri: string
	id: number
}
interface Message {
	text: string
	sender: string
}
export interface IChatMessage extends Message {
	_id: string
	createdAt: Date
	user: { _id: string }
}

export const PATH_COLLECTION_ANIMALS = 'animals'
export const PATH_COLLECTION_USERS = 'users'
export const PATH_COLLECTION_CHAT = 'chats'
export const PATH_ITEM_OWM_ANIMALS = 'ownAnimals'
export const PATH_ITEM_FAVORITE = 'favorites'
export const PATH_ITEM_CHAT = 'chat'

export const UserService = {
	////// User and common

	async getUserDataById(userId: string): Promise<IUserData> {
		try {
			const userDocRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			const userDocSnapshot = await getDoc(userDocRef)

			if (userDocSnapshot.exists()) {
				const userData = userDocSnapshot.data()
				const user: IUserData = {
					id: userDocRef.id,
					chats: userData?.chats || [],
					ownAnimals: userData?.ownAnimals || [],
					name: userData?.name || '',
					avatar: userData?.avatar || '',
				}
				return user
			} else {
				throw new Error(`User with ${userId} not found`)
			}
		} catch (error) {
			throw error
		}
	},
	async creatingOwnerProfile(userData: {
		userId: string
		avatar: string
		name: string
	}): Promise<void> {
		const { userId, avatar, name } = userData
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			await setDoc(docRef, { name, avatar })
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

	////// animal collection

	// async getCollection(animalType: string, page: number) {
	// 	try {
	// 		const collectionRef = collection(FIREBASE_DB, PATH_COLLECTION_ANIMALS)
	// 		let querySnapshot
	// 		if (animalType === 'All') {
	// 			querySnapshot = await getDocs(collectionRef)
	// 		} else {
	// 			const q = query(collectionRef, where('type', '==', animalType))
	// 			querySnapshot = await getDocs(q)
	// 		}

	// 		const data: IAnimalsData[] = querySnapshot.docs.map((doc) => {
	// 			const docData = doc.data()
	// 			const docId = doc.id
	// 			const formattedData: IAnimalsData = {
	// 				id: docId,
	// 				name: docData.name || '',
	// 				color: docData.color || '',
	// 				age: docData.age || { year: 0, month: 0, day: 0 },
	// 				breed: docData.breed || '',
	// 				imageUri: docData.imageUri || [],
	// 				type: docData.type || '',
	// 				description: docData.description || '',
	// 				gender: docData.gender || '',
	// 				weight: docData.weight || 0,
	// 				vaccine: docData.vaccine || false,
	// 				owner: docData.owner || {},
	// 				...docData,
	// 			}
	// 			return formattedData
	// 		})

	// 		return data
	// 	} catch (error) {
	// 		console.log('Error getting collections: ', error)
	// 		return []
	// 	}
	// },

	// async getCollection(animalType: string, page: number, pageSize: number) {
	// 	try {
	// 		const collectionRef = collection(FIREBASE_DB, PATH_COLLECTION_ANIMALS)
	// 		let queryRef
	// 		if (animalType === 'All') {
	// 			queryRef = query(collectionRef)
	// 		} else {
	// 			queryRef = query(collectionRef, where('type', '==', animalType))
	// 		}

	// 		const startAfterDoc = (page - 1) * pageSize

	// 		const querySnapshot = await getDocs(
	// 			query(
	// 				queryRef,
	// 				orderBy('createdAt'),
	// 				startAfter(startAfterDoc),
	// 				limit(pageSize)
	// 			)
	// 		)

	// 		const data: IAnimalsData[] = querySnapshot.docs.map((doc) => {
	// 			const docData = doc.data()
	// 			const docId = doc.id
	// 			const formattedData: IAnimalsData = {
	// 				id: docId,
	// 				name: docData.name || '',
	// 				color: docData.color || '',
	// 				age: docData.age || { year: 0, month: 0, day: 0 },
	// 				breed: docData.breed || '',
	// 				imageUri: docData.imageUri || [],
	// 				type: docData.type || '',
	// 				description: docData.description || '',
	// 				gender: docData.gender || '',
	// 				weight: docData.weight || 0,
	// 				vaccine: docData.vaccine || false,
	// 				owner: docData.owner || {},
	// 				createdAt: docData.createdAt || '',
	// 				...docData,
	// 			}
	// 			return formattedData
	// 		})

	// 		return data
	// 	} catch (error) {
	// 		console.error('Error fetching collection: ', error)
	// 		return []
	// 	}
	// },

	async getCollection(
		animalType: string,
		page: number,
		pageSize: number
	): Promise<{ data: IAnimalsData[] | []; totalPages: number }> {
		try {
			const collectionRef = collection(FIREBASE_DB, PATH_COLLECTION_ANIMALS)
			let queryRef

			if (animalType === 'All') {
				queryRef = collectionRef
			} else {
				queryRef = query(collectionRef, where('type', '==', animalType))
			}

			const totalDocsSnapshot = await getDocs(queryRef)
			const totalDocs = totalDocsSnapshot.size
			const totalPages = Math.ceil(totalDocs / pageSize)

			if (animalType === 'All') {
				queryRef = query(
					queryRef,
					orderBy('createdAt', 'desc'),
					limit(pageSize)
				)
			} else {
				queryRef = query(
					queryRef,
					orderBy('createdAt', 'desc'),
					limit(pageSize)
				)
			}

			if (page > 1) {
				const first = query(queryRef, limit((page - 1) * pageSize))
				const documentSnapshots = await getDocs(first)
				const lastVisible =
					documentSnapshots.docs[documentSnapshots.docs.length - 1]
				queryRef = query(queryRef, startAfter(lastVisible))
			}
			const querySnapshot = await getDocs(queryRef)

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
					createdAt: docData.createdAt || '',
					...docData,
				}
				return formattedData
			})

			return { data, totalPages }
		} catch (error) {
			console.error('Error fetching collection: ', error)
			return { data: [], totalPages: 0 }
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

	//////// operations with own collection of animals

	async addOwnAnimalToProfile(itemId: string, userId: string): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
			await updateDoc(docRef, {
				[PATH_ITEM_OWM_ANIMALS]: arrayUnion(itemId),
			})
		} catch (error) {
			throw error
		}
	},

	async removeOwnAnimalFromProfile(
		itemId: string,
		userId: string
	): Promise<void> {
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

	async getOwnAnimalIdList(userId: string) {
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

	async getOwnAnimalColl(userId: string) {
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

	/////////// operations with favorite list

	async toggleFavoriteList(id: string, userId: string): Promise<void> {
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

	async getFavoriteIdList(userId: string) {
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

	async saveChatIdToProfile(
		chatId: string,
		senderId: string,
		receiverId: string
	): Promise<void> {
		try {
			const senderDocRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, senderId)
			const receiverDocRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, receiverId)

			await updateDoc(senderDocRef, { [PATH_ITEM_CHAT]: arrayUnion(chatId) })
			await updateDoc(receiverDocRef, { [PATH_ITEM_CHAT]: arrayUnion(chatId) })
		} catch (error) {
			throw error
		}
	},

	async removeChatIdFromProfile(chatId: string, userId: string): Promise<void> {
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

	async createChat(senderId: string, receiverId: string): Promise<string> {
		try {
			const participants = [senderId, receiverId]
			const chatRef = doc(FIREBASE_DB, 'chats', senderId + '_' + receiverId)

			const chatData = {
				participants,
			}

			await setDoc(chatRef, chatData)

			await this.saveChatIdToProfile(chatRef.id, senderId, receiverId)

			return chatRef.id
		} catch (error) {
			throw error
		}
	},

	async saveMessageToChat(
		chatID: string,
		message: Message,
		senderId: string
	): Promise<string> {
		try {
			const chatRef = doc(FIREBASE_DB, 'chats', chatID)
			const messageData = {
				_id: uuid.v4(),
				text: message.text,
				sender: message.sender,
				createdAt: serverTimestamp(),
				user: { _id: senderId, avatar: 'https://placeimg.com/140/140/any' },
			}

			const messagesRef = collection(chatRef, 'messages')
			const docRef = await addDoc(messagesRef, messageData)

			return docRef.id
		} catch (error) {
			throw error
		}
	},

	async getParticipantsByIdChat(chatID: string): Promise<string[]> {
		try {
			const chatRef = doc(FIREBASE_DB, 'chats', chatID)
			const docSnapshot = await getDoc(chatRef)

			if (docSnapshot.exists()) {
				const participantsId = docSnapshot.data()
				const idList = participantsId?.participants || []
				return idList
			} else {
				throw new Error('You dont have participants id list')
			}
		} catch (error) {
			throw error
		}
	},

	async getChatMessages(chatID: string): Promise<IChatScreenMessage[]> {
		try {
			const chatRef = doc(FIREBASE_DB, 'chats', chatID)
			const messagesRef = collection(chatRef, 'messages')
			const q = query(messagesRef, orderBy('createdAt'))
			const querySnapshot = await getDocs(q)

			const messages = querySnapshot.docs.map((doc): IChatScreenMessage => {
				const docData = doc.data()
				return {
					_id: doc.id,
					text: docData.text || '',
					sender: docData.sender || '',
					createdAt: docData.createdAt
						? docData.createdAt.toDate()
						: new Date(0),
					user: {
						_id: docData.sender || '',
						avatar: docData.user.avatar,
					},
				}
			})

			return messages.reverse()
		} catch (error) {
			throw error
		}
	},

	async getChatList(userId: string): Promise<IMessageList[]> {
		try {
			const chatIdList = await this.getChatIdList(userId)

			const chatList = await Promise.all(
				chatIdList.map(async (chatId: string) => {
					const messages = await this.getChatMessages(chatId)
					const participantIdList = await this.getParticipantsByIdChat(chatId)
					const interlocutorId = participantIdList
						.filter((id) => id !== userId)
						.toString()
					const interlocutorData = await this.getUserDataById(interlocutorId)
					const firstMessage = messages[0]
					const messageTimeDistance = formatDistanceToNow(
						new Date(firstMessage.createdAt),
						{ addSuffix: false }
					)

					return {
						id: chatId,
						messageText: messages[0].text,
						messageTime: messageTimeDistance,
						userImg: interlocutorData.avatar || '',
						userName: interlocutorData.name || '',
					}
				})
			)
			return chatList
		} catch (error) {
			throw error
		}
	},

	async subscribeToChatMessages(
		chatId: string,
		callback: (messages: IChatScreenMessage[]) => void
	): Promise<Unsubscribe> {
		const chatRef = doc(FIREBASE_DB, 'chats', chatId)
		const messagesRef = collection(chatRef, 'messages')
		const q = query(messagesRef, orderBy('createdAt'))

		return onSnapshot(q, (snapshot) => {
			const messages = snapshot.docs.map((doc) => {
				const docData = doc.data()
				return {
					_id: doc.id,
					text: docData.text || '',
					sender: docData.sender || '',
					createdAt: docData.createdAt
						? docData.createdAt.toDate()
						: new Date(0),
					user: {
						_id: docData.sender || '',
						avatar: docData.user.avatar,
					},
				}
			})
			callback(messages.reverse())
		})
	},

	// async getChatMessages(chatID: string): Promise<IChatScreenMessage[]> {
	// 	try {
	// 		const chatRef = doc(FIREBASE_DB, 'chats', chatID)
	// 		const messagesRef = collection(chatRef, 'messages')
	// 		const querySnapshot = await getDocs(messagesRef)
	// 		const messages = querySnapshot.docs.map((doc) => {
	// 			const docData = doc.data()
	// 			return {
	// 				_id: doc.id,
	// 				text: docData.text || '',
	// 				sender: docData.sender || '',
	// 				createdAt: docData.createdAt
	// 					? docData.createdAt.toDate()
	// 					: new Date(0),
	// 				user: {
	// 					_id: docData.sender || '',
	// 					avatar: docData.user.avatar,
	// 				},
	// 			}
	// 		})

	// 		return messages
	// 	} catch (error) {
	// 		throw error
	// 	}
	// },

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
