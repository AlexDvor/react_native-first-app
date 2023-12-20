import { formatDistanceToNow } from 'date-fns'
import {
	Unsubscribe,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import uuid from 'react-native-uuid'
import { FIREBASE_DB } from '~config/firebaseConfig'
import { IChatScreenMessage, IMessageList } from '~interfaces/message.types'

import { Constants } from './config.services'
import { UserService } from './user.services'

interface Message {
	text: string
	sender: string
}
export interface IChatMessage extends Message {
	_id: string
	createdAt: Date
	user: { _id: string }
}
const { COLLECTION_CHAT, COLLECTION_USERS, ITEM_CHAT } = Constants

export const ChatService = {
	async getChatIdList(userId: string) {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
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
			const senderDocRef = doc(FIREBASE_DB, COLLECTION_USERS, senderId)
			const receiverDocRef = doc(FIREBASE_DB, COLLECTION_USERS, receiverId)

			await updateDoc(senderDocRef, { [ITEM_CHAT]: arrayUnion(chatId) })
			await updateDoc(receiverDocRef, { [ITEM_CHAT]: arrayUnion(chatId) })
		} catch (error) {
			throw error
		}
	},

	async removeChatIdFromProfile(chatId: string, userId: string): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const chatIdList = userData?.chat || []

				if (chatIdList.includes(chatId)) {
					await updateDoc(docRef, {
						[ITEM_CHAT]: arrayRemove(chatId),
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
			const chatRef = doc(
				FIREBASE_DB,
				COLLECTION_CHAT,
				senderId + '_' + receiverId
			)

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
			const chatRef = doc(FIREBASE_DB, COLLECTION_CHAT, chatID)
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
			const chatRef = doc(FIREBASE_DB, COLLECTION_CHAT, chatID)
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
			const chatRef = doc(FIREBASE_DB, COLLECTION_CHAT, chatID)
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
					const interlocutorData = await UserService.getUserRef(interlocutorId)
					const firstMessage = messages[0]
					const messageTimeDistance = formatDistanceToNow(
						new Date(firstMessage.createdAt),
						{ addSuffix: false }
					)

					return {
						id: chatId,
						messageText: messages[0].text,
						messageTime: messageTimeDistance,
						userImg: interlocutorData.user.avatar || '',
						userName: interlocutorData.user.name || '',
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
		const chatRef = doc(FIREBASE_DB, COLLECTION_CHAT, chatId)
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
}
