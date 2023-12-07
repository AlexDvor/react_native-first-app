import { TGetDistance } from '~helper/number/getTimeDistance'
import { IAnimalsData } from '~interfaces/animals.types'
import {
	IReceiverInfo,
	TNotification,
	TSenderInfo,
	TypeNotification,
} from '~interfaces/notification'

export interface INewMessage {
	idMsg: string
	typeMsg: TypeNotification
	messageObj: { title: string; text: string } | undefined
	sendTime: Date | TGetDistance
	senderInfo: TSenderInfo
	receiverInfo: IReceiverInfo
	animalInfo: IAnimalsData
}

export const NotifyTemplates = {
	createMsg(
		objMsg: INewMessage,
		notifyType: TypeNotification
	): TNotification | undefined {
		const {
			idMsg,
			messageObj,
			receiverInfo,
			senderInfo,
			sendTime,
			typeMsg,
			animalInfo,
		} = objMsg

		if (notifyType === 'offer') {
			const notifyMsg = this.getOfferMsgTemplate(senderInfo, animalInfo)

			const message: TNotification = {
				id: idMsg,
				message: { ...notifyMsg },
				sendDate: sendTime,
				readDate: null,
				read: false,
				type: notifyType,
				confirmInfo: {
					confirmed: null,
					reject: null,
					date: null,
				},
				senderReceiverInfo: {
					senderId: senderInfo.id,
					receiverId: receiverInfo.id,
				},
				addInfoItem: {
					id: animalInfo.id,
				},
			}

			return message
		}

		if (notifyType === 'notification') {
			const notifyMsg = this.getReqConfMsgTemplate(animalInfo)
			const message: TNotification = {
				id: idMsg,
				message: { ...notifyMsg },
				sendDate: sendTime,
				readDate: null,
				read: false,
				type: notifyType,
				confirmInfo: {
					confirmed: null,
					reject: null,
					date: null,
				},
				senderReceiverInfo: {
					senderId: senderInfo.id,
					receiverId: receiverInfo.id,
				},
				addInfoItem: {
					id: animalInfo.id,
				},
			}

			return message
		}

		if (notifyType === 'confirmation') {
			const notifyMsg = this.getConfMsgTemplate()
			const message: TNotification = {
				id: idMsg,
				message: { ...notifyMsg },
				sendDate: sendTime,
				readDate: null,
				read: false,
				type: notifyType,
				confirmInfo: {
					confirmed: null,
					reject: null,
					date: null,
				},
				senderReceiverInfo: {
					senderId: senderInfo.id,
					receiverId: receiverInfo.id,
				},
				addInfoItem: {
					id: animalInfo.id,
				},
			}

			return message
		}
	},

	getOfferMsgTemplate(user: TSenderInfo, animal: IAnimalsData) {
		const title = `Request to Adopt ${animal.name}`
		const text = `User ${user.name} wants to adopt your animal ${animal.name}. Please check and accept the request if you agree.`
		return {
			title,
			text,
		}
	},

	getReqConfMsgTemplate(animal: IAnimalsData) {
		const title = `Request to Adopt ${animal.name}`
		const text = `"Your request has been successfully sent. Please await a response from the animal's owner. Thank you for your interest!`
		return {
			title,
			text,
		}
	},

	getConfMsgTemplate() {
		const title = 'Request Confirmation'
		const text = `Your Request has been successfully confirmed. Thank you for your participation and cooperation!`
		return {
			title,
			text,
		}
	},
}
