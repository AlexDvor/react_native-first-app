import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { ChatScreen } from '~components/screens/MainScreen/NestedScreen/ChatScreen'
import { COLORS } from '~constants/theme'

import { MessagesScreen } from '../components/screens/MainScreen/MessagesScreen'
import { MessageRootStackParamList } from '../interfaces/message.navigation.types'

const MessageStack = createStackNavigator<MessageRootStackParamList>()

export const MessageStackNavigator: FC = () => {
	const { Navigator, Screen } = MessageStack
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen
				name="MessageScreen"
				component={MessagesScreen}
				options={{
					cardStyle: {
						backgroundColor: COLORS.screenBackgroundColor,
					},
					headerStyle: {
						backgroundColor: COLORS.screenHeaderBackgroundColor,
					},
				}}
			></Screen>
			<Screen
				name="ChatScreen"
				component={ChatScreen}
				options={{
					cardStyle: {
						backgroundColor: COLORS.screenBackgroundColor,
					},
					headerStyle: {
						backgroundColor: COLORS.screenHeaderBackgroundColor,
					},
				}}
			></Screen>
		</Navigator>
	)
}
