import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { ChatScreen } from '~components/screens/MainScreen/NestedScreen/ChatScreen'
import { NotificationItemScreen } from '~components/screens/MainScreen/NestedScreen/NotificationItemScreen'
import { NotificationScreen } from '~components/screens/MainScreen/NotificationScreen'
import { COLORS } from '~constants/theme'

import { HomeScreen } from '../components/screens/MainScreen/HomeScreen'
import { AnimalProfileScreen } from '../components/screens/MainScreen/NestedScreen/AnimalProfileScreen'
import { HomeRootStackParamList } from '../interfaces/home.navigation.types'

const HomeStack = createStackNavigator<HomeRootStackParamList>()

export const HomeStackNavigator: FC = () => {
	const { Navigator, Screen } = HomeStack
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="HomeScreen" component={HomeScreen}></Screen>
			<Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
				options={{
					headerShown: true,
					title: 'Animal',
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
			<Screen
				name="NotificationScreen"
				component={NotificationScreen}
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
				name="NotificationItemScreen"
				component={NotificationItemScreen}
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
