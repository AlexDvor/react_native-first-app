import { TGetDistance } from '~helper/number/getTimeDistance'

import { IAnimalsData } from './animals.types'
import { IUserProfile } from './user.types'

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
		date: Date | null
	}
	senderReceiverInfo: {
		senderId: string
		receiverId: string
	}
	addInfoItem: {
		id: string | null
	}
}

export interface IReceiverInfo {
	id: string
	name: string
	avatar: string | null
}

export interface TSenderInfo extends IReceiverInfo {}

export type TCreateNotification = {
	receiverInfo: IReceiverInfo
	senderInfo: TSenderInfo
	animalInfo: IAnimalsData
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

export type TIdUsers = {
	senderId: string
	receiverId: string
}
