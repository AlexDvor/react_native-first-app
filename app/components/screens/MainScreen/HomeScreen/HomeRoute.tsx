import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { DefaultHomeScreen } from './DefaultHomeScreen'
import { AnimalProfileScreen } from './NestedHomeScreen/AnimalProfileScreen'

const HomeStack = createStackNavigator()

export const HomeRoute = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="DefaultHomeScreen"
				component={DefaultHomeScreen}
			></HomeStack.Screen>
			<HomeStack.Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
			></HomeStack.Screen>
		</HomeStack.Navigator>
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
