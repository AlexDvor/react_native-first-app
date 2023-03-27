import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { MessagesScreen } from './MessagesScreen'
import { ChatScreen } from './NestedMessageScreen/ChatScreen'
import { MessageRootStackParamList } from './messageNavigation.types'

const MessageStack = createStackNavigator<MessageRootStackParamList>()

export const MessageRootNavigator: FC = () => {
	const { Navigator, Screen } = MessageStack
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="MessageScreen" component={MessagesScreen}></Screen>
			<Screen name="ChatScreen" component={ChatScreen}></Screen>
		</Navigator>
	)
}
