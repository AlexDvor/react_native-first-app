import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

export type MessageRootStackParamList = {
	MessageScreen: undefined
	ChatScreen: { chatId: string }
}

export type ChatProps = StackScreenProps<
	MessageRootStackParamList,
	'ChatScreen'
>

export type MessageNavigationComponent =
	StackNavigationProp<MessageRootStackParamList>
