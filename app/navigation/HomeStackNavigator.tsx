import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { ChatScreen } from '~components/screens/MainScreen/NestedScreen/ChatScreen'
import { NotificationItemScreen } from '~components/screens/MainScreen/NestedScreen/NotificationItemScreen'
import { NotificationScreen } from '~components/screens/MainScreen/NotificationScreen'
import { screenOptionsConf } from '~config/tabBarNavigator.config'

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
					...screenOptionsConf,
					headerShown: true,
					title: 'Animal',
				}}
			></Screen>
			<Screen
				name="ChatScreen"
				component={ChatScreen}
				options={{
					...screenOptionsConf,
				}}
			></Screen>
			<Screen
				name="NotificationScreen"
				component={NotificationScreen}
				options={{
					...screenOptionsConf,
				}}
			></Screen>
			<Screen
				name="NotificationItemScreen"
				component={NotificationItemScreen}
				options={{
					...screenOptionsConf,
				}}
			></Screen>
		</Navigator>
	)
}
