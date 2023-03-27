import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

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
			></Screen>
		</Navigator>
	)
}
