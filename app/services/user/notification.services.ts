import { doc, getDoc, updateDoc } from 'firebase/firestore'
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
import { AnimalService } from '~services/animal.services'
import { CollectionServices } from '~services/coll.services'

import { Constants } from './config.services'
import { UserService } from './user.services'

const { COLLECTION_USERS, ITEM_NOTIFICATIONS } = Constants

export const NotificationService = {
	async getNotifications(userId: string): Promise<TNotification[]> {
		try {
			const { user } = await UserService.getUserRef(userId)
			const notifyColl = user.notifications
			return notifyColl.reverse()
		} catch (error) {
			throw error
		}
	},

	async createAndSendNotify(
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

				if (notifyOwner && notifySender) {
					await this.sendNotificationToUser(notifyOwner, animalInfo.owner.id)
					await this.sendNotificationToUser(notifySender, senderInfo.id)
				} else {
					throw new Error('Type message is invalid')
				}
			}

			if (type === 'notification') {
				//send just message to user
			}

			if (type === 'confirmation') {
				const confNotify = NotifyTemplates.createMsg(
					notifyParams,
					'confirmation'
				)
				if (confNotify) {
					await this.sendNotificationToUser(confNotify, senderInfo.id)
				} else {
					throw new Error('Type message is invalid')
				}
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
			const { userDocRef } = await UserService.getUserRef(receiverId)
			await CollectionServices.addDocToCollection(
				'ITEM_NOTIFICATIONS',
				notifyObj,
				userDocRef
			)
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
			const { user, userDocRef } = await UserService.getUserRef(userId)
			const notifyColl = user.notifications
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

			await CollectionServices.updateOwnUserColl(
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
		const currentTime = new Date()
		const { receiverId, senderId } = idUsers

		try {
			const { user: recvData, userDocRef: recvRef } =
				await UserService.getUserRef(receiverId)
			const { user: sendData, userDocRef: sendRef } =
				await UserService.getUserRef(senderId)

			const notifyCollRecv = recvData.notifications
			const notifyCollSend = sendData.notifications

			const recvIndex = await CollectionServices.findItemIndexColl(
				notifyId,
				notifyCollRecv
			)

			const sendIndex = await CollectionServices.findItemIndexColl(
				notifyId,
				notifyCollSend
			)

			if (recvIndex >= 0 && sendIndex >= 0) {
				//changed notify data for receiver user
				if (notifyCollRecv[recvIndex].type === 'offer') {
					notifyCollRecv[recvIndex].confirmInfo.confirmed = true
					notifyCollRecv[recvIndex].confirmInfo.date = currentTime
					await CollectionServices.updateOwnUserColl(
						'ITEM_NOTIFICATIONS',
						notifyCollRecv,
						recvRef
					)
				}

				if (notifyCollSend[sendIndex].type === 'notification') {
					//changed notify data for sender user
					const adoptAnimalId = notifyCollSend[sendIndex].addInfoItem.id

					if (adoptAnimalId) {
						const currAnimalInfo = await AnimalService.getAnimalById(
							adoptAnimalId
						)

						const notifyObj: TCreateNotification = {
							animalInfo: currAnimalInfo,
							type: 'confirmation',
							senderInfo: {
								id: senderId,
								name: sendData.name || '',
								avatar: sendData.avatar,
							},
							receiverInfo: {
								id: receiverId,
								name: recvData.name || '',
								avatar: recvData.avatar,
							},
						}

						//send confirm notification to sendUser
						await this.createAndSendNotify(notifyObj)
						// upd animal field
						await AnimalService.updateAdoptedByUser(
							currAnimalInfo.id,
							notifyObj.senderInfo
						)
					}
				}
			}
		} catch (error) {
			console.log('❌ ~ confirmAdoption', error)
		}
	},

	async rejectAdoption(notifyId: string, idUsers: TIdUsers) {
		try {
		} catch (error) {}
	},
}
