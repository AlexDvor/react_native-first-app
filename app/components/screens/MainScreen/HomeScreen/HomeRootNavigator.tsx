import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HomeRootStackParamList } from '~interfaces/navigator.types'

import { DefaultHomeScreen } from './DefaultHomeScreen'
import { AnimalProfileScreen } from './NestedHomeScreen/AnimalProfileScreen'

const HomeStack = createStackNavigator<HomeRootStackParamList>()

export const HomeRootNavigator = () => {
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: 'red',
		fontSize: 25,
	},
})
