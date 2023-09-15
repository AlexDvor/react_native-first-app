import { ImageSourcePropType } from 'react-native'

export interface IMessageList {
	id: string
	userName: string
	userImg: ImageSourcePropType
	messageTime: string
	messageText: string
}
export interface IChatScreenMessage {
	_id: string
	text: string
	sender: string
	createdAt: Date
	user: {
		_id: string
		avatar: string
	}
	isSending?: boolean
}
