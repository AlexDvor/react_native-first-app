import firebase from 'firebase/app'
import {
	DocumentData,
	DocumentReference,
	FieldValue,
	arrayUnion,
	doc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import 'firebase/firestore'
import uuid from 'react-native-uuid'
import { FIREBASE_DB } from '~config/firebaseConfig'
import { NotificationTemplateMessages } from '~helper/notification/notificationMessage'
import { TGetDistance } from '~helper/number/getTimeDistance'
import { IAnimalsData } from '~interfaces/animals.types'
import { IAllCollectionsUser, IUserProfile } from '~interfaces/user.types'

import { Constants, TCollections } from './config.services'

const { COLLECTION_USERS, ITEM_NOTIFICATIONS } = Constants

export type TypeNotification = 'offer' | 'notification' | 'confirmation'

export type TNotification = {
	id: string
	message: { title: string; text: string }
	sendDate: Date | TGetDistance
	readDate: Date | null
	read: boolean
	type: TypeNotification
	confirmInfo: {
		confirmed: boolean | null
		reject: boolean | null
		date: null | TGetDistance
	}
	senderReceiverInfo: {
		senderId: string
		receiverId: string
	}
}

export type TSenderData = {
	name: string | null
	id: string | null
	email: string | null
}

export type TCreateNotification = {
	receiverData: IUserProfile
	senderData: TSenderData
	animalData: IAnimalsData
	type: TypeNotification
	messageObj?: { title: string; text: string }
}

export type TSendNotification = {
	receiverId: string
	notificationObj: { title: string; text: string }
	notificationId: string
	type: TypeNotification
	time: Date
	senderReceiverInfo: {
		receiverId: string
		senderId: string
	}
}

export type TIdUser = {
	senderId: string
	receiverId: string
}

export const NotificationService = {
	async getNotifications(userId: string) {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)
			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const notificationList = userData?.notifications || []
				return notificationList
			} else {
				throw new Error('You dont have notification list')
			}
		} catch (error) {
			throw error
		}
	},

	async getAllCollectionsUser(
		userId: string
	): Promise<{ data: IAllCollectionsUser; userDocRef: DocumentData }> {
		// remove to another class
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (!docSnapshot.exists()) {
				throw new Error('User not found')
			}

			const userData = docSnapshot.data()
			if (userData) {
				return {
					data: userData as IAllCollectionsUser,
					userDocRef: docRef,
				}
			} else {
				throw new Error('User data is invalid')
			}
		} catch (error) {
			throw error
		}
	},

	async updateDocCollection(
		userId: string,
		coll: TCollections,
		newData: Object,
		ref: DocumentReference<DocumentData>
	) {
		const nameColl = Constants[coll]
		try {
			await updateDoc(ref, {
				[nameColl]: newData,
			})
		} catch (error) {
			console.log('❌ ~ updateDocCollection:', error)
			throw error
		}
	},

	// async sendNotificationToOwner(
	// 	userId: string,
	// 	notificationItem: TCreateNotification
	// ): Promise<void> {
	// 	try {
	// 		const newID = uuid.v4().slice(0, 12)
	// 		const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)

	// 		const docSnap = await getDoc(docRef)
	// 		if (docSnap.exists()) {
	// 			const userData = docSnap.data()
	// 			const notifications = userData[ITEM_NOTIFICATIONS] || []

	// 			const existingNotificationIndex = notifications.findIndex(
	// 				(notification: TNotification) => notification.id === newID
	// 			)

	// 			if (existingNotificationIndex !== -1) {
	// 				notifications[existingNotificationIndex] = {
	// 					...notificationItem,
	// 					id: newID,
	// 					sendDate: new Date(),
	// 				}
	// 			} else {
	// 				notifications.push(notificationItem)
	// 			}

	// 			await updateDoc(docRef, { [ITEM_NOTIFICATIONS]: notifications })
	// 		}
	// 	} catch (error) {
	// 		throw error
	// 	}
	// },

	async createdNotification(
		notificationObj: TCreateNotification
	): Promise<void> {
		const { messageObj, receiverData, senderData, animalData, type } =
			notificationObj
		const notifyId = uuid.v4() as string
		const currentTime = new Date()

		try {
			if (type === 'offer' && senderData.id) {
				const notifyOwner = NotificationTemplateMessages.getOfferMessage(
					senderData,
					animalData,
					notifyId
				)

				const notifyUser =
					NotificationTemplateMessages.getRequestConfirmationMessage(
						animalData,
						notifyId
					)

				const ownerMessage: TNotification = {
					id: notifyId,
					message: { ...notifyOwner },
					sendDate: currentTime,
					readDate: null,
					read: false,
					type: 'offer',
					confirmInfo: {
						confirmed: null,
						reject: null,
						date: null,
					},
					senderReceiverInfo: {
						receiverId: animalData.owner.id,
						senderId: senderData.id,
					},
				}

				const userMessage: TNotification = {
					id: notifyId,
					message: { ...notifyUser },
					sendDate: currentTime,
					readDate: null,
					read: false,
					type: 'notification',
					confirmInfo: {
						confirmed: null,
						reject: null,
						date: null,
					},
					senderReceiverInfo: {
						receiverId: animalData.owner.id,
						senderId: senderData.id,
					},
				}

				await this.sendNotificationToOwner(ownerMessage, animalData.owner.id)
				await this.sendNotificationToCurrentUser(userMessage, senderData.id)

				return
			}

			if (type === 'notification') {
				//send just message to user
			}

			if (type === 'confirmation') {
				// confirm both notifications
			}
		} catch (error) {
			throw error
		}
	},

	async sendNotificationToCurrentUser(
		notifyObj: TNotification,
		receiverId: string
	): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, receiverId)
			await updateDoc(docRef, {
				[ITEM_NOTIFICATIONS]: arrayUnion(notifyObj),
			})
		} catch (error) {
			throw error
		}
	},

	async sendNotificationToOwner(
		notifyObj: TNotification,
		receiverId: string
	): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, receiverId)
			await updateDoc(docRef, {
				[ITEM_NOTIFICATIONS]: arrayUnion(notifyObj),
			})
		} catch (error) {
			throw error
		}
	},

	async removeNotificationFromUserColl(
		userId: string,
		notificationId: string
	): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const notificationsList = userData?.notifications || []

				const index = notificationsList.findIndex(
					(item: TNotification) => item.id === notificationId
				)

				if (index !== -1) {
					notificationsList.splice(index, 1)

					await updateDoc(docRef, {
						[ITEM_NOTIFICATIONS]: notificationsList,
					})
					console.log('Notification removed from Profile')
				} else {
					console.log('Item ID not found in notificationsList')
				}
			} else {
				throw new Error('User document not found')
			}
		} catch (error) {
			throw error
		}
	},

	async markNotificationAsRead(
		notificationId: string,
		userId: string
	): Promise<void> {
		const currentTime = new Date()
		try {
			const userDocRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const userDoc = await getDoc(userDocRef)

			if (!userDoc.exists()) {
				throw new Error('User not found')
			}

			const userData = userDoc.data()
			if (!userData || !userData[ITEM_NOTIFICATIONS]) {
				throw new Error('Notifications data not found')
			}

			const notifications: TNotification[] = userData[ITEM_NOTIFICATIONS]

			const notificationIndex = notifications.findIndex(
				(notification: any) => notification.id === notificationId
			)

			if (notificationIndex === -1) {
				throw new Error('Notification not found')
			}

			notifications[notificationIndex].read = true
			notifications[notificationIndex].readDate = currentTime

			await updateDoc(userDocRef, {
				[ITEM_NOTIFICATIONS]: notifications,
			})
		} catch (error) {
			throw error
		}
	},
	async confirmAdoption(notifyId: string, idUsers?: TIdUser) {
		try {
			// const userDoc= await NotificationService.getAllCollectionsUser()
			// await this this.updateDocCollection("","ITEM_NOTIFICATIONS",{})
		} catch (error) {}
	},
	async rejectAdoption(notifyId: string, idUsers: TIdUser) {
		try {
		} catch (error) {}
	},
}
