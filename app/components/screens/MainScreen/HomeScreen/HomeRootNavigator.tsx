import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { HomeRootStackParamList } from '~interfaces/navigator.types'

import { DefaultHomeScreen } from './DefaultHomeScreen'
import { AnimalProfileScreen } from './NestedHomeScreen/AnimalProfileScreen'

const HomeStack = createStackNavigator<HomeRootStackParamList>()

export const HomeRootNavigator: FC = () => {
	const { Navigator, Screen } = HomeStack
	return (
		<Navigator>
			<Screen name="DefaultHomeScreen" component={DefaultHomeScreen}></Screen>
			<Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
			></Screen>
		</Navigator>
	)
}
