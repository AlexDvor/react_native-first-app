import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import uuid from 'react-native-uuid'
import { FIREBASE_DB } from '~config/firebaseConfig'
import { NotificationTemplateMessages } from '~helper/notification/notificationMessage'
import { TGetDistance } from '~helper/number/getTimeDistance'
import { IAnimalsData } from '~interfaces/animals.types'
import { IUserProfile } from '~interfaces/user.types'

import { Constants } from './config.services'

const { PATH_COLLECTION_USERS, PATH_ITEM_NOTIFICATIONS } = Constants

export type TypeNotification = 'offer' | 'notification' | 'confirmation'

export type TNotification = {
	id: string
	message: { title: string; text: string }
	sendDate: Date & TGetDistance
	readDate: Date | null | TGetDistance
	read: boolean
	type: TypeNotification
	confirmed: boolean
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
	messageObj?: { title: string; text: string }
	type: TypeNotification
}

type TSendNotification = {
	receiverId: string
	notificationObj: { title: string; text: string }
	notificationId: string
	type: TypeNotification
	time: Date
}

export const NotificationService = {
	async getNotifications(userId: string) {
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
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

	// async sendNotificationToOwner(
	// 	userId: string,
	// 	notificationItem: TCreateNotification
	// ): Promise<void> {
	// 	try {
	// 		const newID = uuid.v4().slice(0, 12)
	// 		const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)

	// 		const docSnap = await getDoc(docRef)
	// 		if (docSnap.exists()) {
	// 			const userData = docSnap.data()
	// 			const notifications = userData[PATH_ITEM_NOTIFICATIONS] || []

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

	// 			await updateDoc(docRef, { [PATH_ITEM_NOTIFICATIONS]: notifications })
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

				const ownerMessage: TSendNotification = {
					notificationId: notifyId,
					notificationObj: { ...notifyOwner },
					receiverId: animalData.owner.id,
					time: currentTime,
					type: 'offer',
				}

				const userMessage: TSendNotification = {
					notificationId: notifyId,
					notificationObj: { ...notifyUser },
					receiverId: senderData.id,
					time: currentTime,
					type: 'notification',
				}

				await this.sendNotificationToOwner(ownerMessage)
				await this.sendNotificationToCurrentUser(userMessage)

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
		notifyObj: TSendNotification
	): Promise<void> {
		const { notificationId, notificationObj, receiverId, time, type } =
			notifyObj
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, receiverId)

			const notificationMessage: TNotification = {
				message: { ...notificationObj },
				id: notificationId,
				sendDate: time,
				readDate: null,
				read: false,
				confirmed: false,
				type,
			}

			await updateDoc(docRef, {
				[PATH_ITEM_NOTIFICATIONS]: arrayUnion(notificationMessage),
			})
		} catch (error) {
			throw error
		}
	},

	async sendNotificationToOwner(notifyObj: TSendNotification): Promise<void> {
		const { notificationId, notificationObj, receiverId, time, type } =
			notifyObj
		try {
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, receiverId)

			const notificationMessage: TNotification = {
				message: { ...notificationObj },
				id: notificationId,
				sendDate: time,
				readDate: null,
				read: false,
				confirmed: false,
				type,
			}

			await updateDoc(docRef, {
				[PATH_ITEM_NOTIFICATIONS]: arrayUnion(notificationMessage),
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
			const docRef = doc(FIREBASE_DB, PATH_COLLECTION_USERS, userId)
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
						[PATH_ITEM_NOTIFICATIONS]: notificationsList,
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
}
