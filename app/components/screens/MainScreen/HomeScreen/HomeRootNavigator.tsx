import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { HomeRootStackParamList } from '~interfaces/navigator.types'

import { HomeScreen } from './HomeScreen'
import { AnimalProfileScreen } from './NestedHomeScreen/AnimalProfileScreen'

const HomeStack = createStackNavigator<HomeRootStackParamList>()

export const HomeRootNavigator: FC = () => {
	const { Navigator, Screen } = HomeStack
	return (
		<Navigator screenOptions={{ headerShown: true }}>
			<Screen name="HomeScreen" component={HomeScreen}></Screen>
			<Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
			></Screen>
		</Navigator>
	)
}
