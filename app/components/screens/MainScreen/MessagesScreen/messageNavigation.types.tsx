import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { TMessage } from '~interfaces/message.types'

export type MessageRootStackParamList = {
	MessageScreen: undefined
	ChatScreen: { user: TMessage }
}

export type ChatProps = StackScreenProps<
	MessageRootStackParamList,
	'ChatScreen'
>

export type MessageNavigationComponent =
	StackNavigationProp<MessageRootStackParamList>
