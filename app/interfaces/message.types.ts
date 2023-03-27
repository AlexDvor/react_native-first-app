import { ImageSourcePropType } from 'react-native'

export interface TMessage {
	id: string
	userName: string
	userImg: ImageSourcePropType
	messageTime: string
	messageText: string
}
