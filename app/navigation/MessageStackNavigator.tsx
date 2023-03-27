import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { ChatScreen } from '~components/screens/MainScreen/NestedScreen/ChatScreen'

import { MessagesScreen } from '../components/screens/MainScreen/MessagesScreen'
import { MessageRootStackParamList } from '../interfaces/message.navigation.types'

const MessageStack = createStackNavigator<MessageRootStackParamList>()

export const MessageStackNavigator: FC = () => {
	const { Navigator, Screen } = MessageStack
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="MessageScreen" component={MessagesScreen}></Screen>
			<Screen name="ChatScreen" component={ChatScreen}></Screen>
		</Navigator>
	)
}
