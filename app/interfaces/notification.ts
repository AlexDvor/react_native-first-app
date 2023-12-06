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
export type TSenderData = {
	id: string
	name: string
	avatar: string | null
}

export type TCreateNotification = {
	receiverInfo: IUserProfile
	senderInfo: TSenderData
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
