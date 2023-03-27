import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { HomeScreen } from './HomeScreen'
import { AnimalProfileScreen } from './NestedHomeScreen/AnimalProfileScreen'
import { HomeRootStackParamList } from './homeNavigation.types'

const HomeStack = createStackNavigator<HomeRootStackParamList>()

export const HomeRootNavigator: FC = () => {
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
