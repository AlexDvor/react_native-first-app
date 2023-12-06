import {
	DocumentData,
	DocumentReference,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore'
import 'firebase/firestore'
import uuid from 'react-native-uuid'
import { FIREBASE_DB } from '~config/firebaseConfig'
import {
	INewMessage,
	NotifyTemplates,
} from '~helper/notification/notificationMessage'
import {
	TCreateNotification,
	TIdUsers,
	TNotification,
} from '~interfaces/notification'
import { IAllCollectionsUser } from '~interfaces/user.types'
import { AnimalService } from '~services/animal.services'

import { Constants, TCollections } from './config.services'

const { COLLECTION_USERS, ITEM_NOTIFICATIONS } = Constants

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

	async getAllCollectionsUser(userId: string): Promise<{
		data: IAllCollectionsUser
		userDocRef: DocumentReference<DocumentData>
	}> {
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
		coll: TCollections,
		newData: [] | {} | boolean,
		ref: DocumentReference<DocumentData>
	): Promise<void> {
		const nameColl = Constants[coll]
		try {
			await updateDoc(ref, {
				[nameColl]: newData,
			})
		} catch (error) {
			throw error
		}
	},

	async addDocToCollection(
		coll: TCollections,
		newData: [] | {} | boolean,
		ref: DocumentReference<DocumentData>
	) {
		try {
			await updateDoc(ref, {
				[ITEM_NOTIFICATIONS]: arrayUnion(newData),
			})
		} catch (error) {
			throw error
		}
	},

	async getCollByName(
		collName: TCollections,
		allCollectionUser: IAllCollectionsUser
	): Promise<TNotification[]> {
		try {
			const nameColl = Constants[collName]

			if (nameColl) {
				const collection = allCollectionUser[nameColl]
				if (collection) {
					return collection
				} else {
					throw new Error(`❌ ~ This ${collection} not exist`)
				}
			} else {
				throw new Error(
					`❌ ~ This ${collName} name does not exist in the users database`
				)
			}
		} catch (error) {
			throw error
		}
	},

	async findItemIndexColl(
		notifyId: string,
		coll: TNotification[]
	): Promise<number> {
		if (!Array.isArray(coll)) {
			throw new Error('Invalid collection type')
		}
		try {
			const itemIndex = coll.findIndex((item) => item.id === notifyId)
			if (itemIndex === -1) {
				throw new Error(`Item id not found in notification coll`)
			}
			return itemIndex
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
		const { messageObj, animalInfo, receiverInfo, senderInfo, type } =
			notificationObj
		const notifyId = uuid.v4() as string
		const currentTime = new Date()
		const notifyParams: INewMessage = {
			idMsg: notifyId,
			typeMsg: type,
			sendTime: currentTime,
			senderInfo,
			messageObj,
			receiverInfo,
			animalInfo,
		}

		try {
			if (type === 'offer' && senderInfo.id) {
				const notifyOwner = NotifyTemplates.createMsg(notifyParams, 'offer')

				const notifySender = NotifyTemplates.createMsg(
					notifyParams,
					'notification'
				)

				// const notifyOwner = NotificationTemplateMessages.getOfferMessage(
				// 	senderInfo,
				// 	animalInfo,
				// 	notifyId
				// )

				// const notifyUser =
				// 	NotificationTemplateMessages.getRequestConfirmationMessage(
				// 		animalInfo,
				// 		notifyId
				// 	)

				// const ownerMessage: TNotification = {
				// 	id: notifyId,
				// 	message: { ...notifyOwner },
				// 	sendDate: currentTime,
				// 	readDate: null,
				// 	read: false,
				// 	type: 'offer',
				// 	confirmInfo: {
				// 		confirmed: null,
				// 		reject: null,
				// 		date: null,
				// 	},
				// 	senderReceiverInfo: {
				// 		receiverId: animalInfo.owner.id,
				// 		senderId: senderInfo.id,
				// 	},
				// }

				// const userMessage: TNotification = {
				// 	id: notifyId,
				// 	message: { ...notifyUser },
				// 	sendDate: currentTime,
				// 	readDate: null,
				// 	read: false,
				// 	type: 'notification',
				// 	confirmInfo: {
				// 		confirmed: null,
				// 		reject: null,
				// 		date: null,
				// 	},
				// 	senderReceiverInfo: {
				// 		receiverId: animalInfo.owner.id,
				// 		senderId: senderInfo.id,
				// 	},
				// }

				await this.sendNotificationToUser(notifyOwner, animalInfo.owner.id)
				await this.sendNotificationToUser(notifySender, senderInfo.id)

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

	async sendNotificationToUser(
		notifyObj: TNotification,
		receiverId: string
	): Promise<void> {
		try {
			const { userDocRef } = await this.getAllCollectionsUser(receiverId)
			await this.addDocToCollection('ITEM_NOTIFICATIONS', notifyObj, userDocRef)
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
			const { data, userDocRef } = await this.getAllCollectionsUser(userId)
			const notifyColl = data.notifications
			if (!notifyColl) {
				throw new Error('Notifications data not found')
			}
			const notificationIndex = notifyColl.findIndex(
				(notification: any) => notification.id === notificationId
			)

			if (notificationIndex === -1) {
				throw new Error('Notification  id not found')
			}

			notifyColl[notificationIndex].read = true
			notifyColl[notificationIndex].readDate = currentTime

			await this.updateDocCollection(
				'ITEM_NOTIFICATIONS',
				notifyColl,
				userDocRef
			)
		} catch (error) {
			console.log('❌ ~ markNotificationAsRead:', error)
			throw error
		}
	},

	async confirmAdoption(notifyId: string, idUsers: TIdUsers) {
		const { receiverId, senderId } = idUsers

		try {
			const { data: recvData, userDocRef: recvRef } =
				await this.getAllCollectionsUser(receiverId)
			const { data: sendData, userDocRef: sendRef } =
				await this.getAllCollectionsUser(senderId)

			const recvNotifyColl = await this.getCollByName(
				'ITEM_NOTIFICATIONS',
				recvData
			)

			const sendNotifyColl = await this.getCollByName(
				'ITEM_NOTIFICATIONS',
				sendData
			)

			const recvIndex = await this.findItemIndexColl(notifyId, recvNotifyColl)

			const sendIndex = await this.findItemIndexColl(notifyId, sendNotifyColl)

			if (recvIndex >= 0 && sendIndex >= 0) {
				if (recvNotifyColl[recvIndex].type === 'offer') {
					// recvNotifyColl[recvIndex].confirmInfo.confirmed = true
					// recvNotifyColl[recvIndex].confirmInfo.date = currentTime
				}

				if (sendNotifyColl[recvIndex].type === 'notification') {
					const newId = uuid.v4() as string
					const adoptAnimalId = sendNotifyColl[recvIndex].addInfoItem.id

					if (adoptAnimalId) {
						const currAnimalInfo = await AnimalService.getAnimalById(
							adoptAnimalId
						)

						const notifyObj: TCreateNotification = {
							animalInfo: currAnimalInfo,
							type: 'confirmation',
							senderInfo: {
								id: senderId,
								name: sendData.name,
								avatar: sendData.avatar,
						
							}
							receiverInfo: {
								id: receiverId,
								name: recvData.name,
								avatar:recvData.avatar,
							}
						}
					}

					// const confirmMessage: TNotification = {
					// 	id: newId,
					// 	message: { ...generateMessage },
					// 	sendDate: currentTime,
					// 	readDate: null,
					// 	read: false,
					// 	type: 'notification',
					// 	confirmInfo: {
					// 		confirmed: null,
					// 		reject: null,
					// 		date: null,
					// 	},
					// 	senderReceiverInfo: {
					// 		receiverId: idUsers.receiverId,
					// 		senderId: idUsers.senderId,
					// 	},
					// }
					// await this.createdNotification()
				}
			}

			// const userDoc= await NotificationService.getAllCollectionsUser()
			// await this this.updateDocCollection("","ITEM_NOTIFICATIONS",{})
		} catch (error) {
			console.log('❌ ~ confirmAdoption', error)
		}
	},
	async rejectAdoption(notifyId: string, idUsers: TIdUsers) {
		try {
		} catch (error) {}
	},
}
