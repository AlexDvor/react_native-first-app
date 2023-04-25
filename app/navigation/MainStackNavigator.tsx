import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Route, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { AddPostScreen } from '~components/screens/MainScreen/AddPostScreen'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen'
import { tabBarNavigatorConfig } from '~config/tabBarNavigator.config'

import { FavoriteStackNavigator } from './FavoriteStackNavigator'
import { HomeStackNavigator } from './HomeStackNavigator'
import { MessageStackNavigator } from './MessageStackNavigator'

const MainTabs = createBottomTabNavigator()

const getTabBarActiveBackgroundColor = (
	route: Route<string> | undefined
): string | undefined => {
	if (!route) return
	const routeName = getFocusedRouteNameFromRoute(route)

	if (routeName === 'Favorite') {
		return 'red'
	}

	return 'white'
}

export const MainStackNavigator = () => {
	const { Navigator, Screen } = MainTabs

	return (
		<Navigator screenOptions={tabBarNavigatorConfig} initialRouteName="Home">
			<Screen
				name="Home"
				component={HomeStackNavigator}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="home-outline" size={size} color={color} />
					),
				}}
			/>

			<Screen
				name="Chat"
				component={MessageStackNavigator}
				options={({ route }) => ({
					tabBarIcon: ({ size, color }) => (
						<Ionicons
							name="chatbubble-ellipses-outline"
							size={size}
							color={color}
						/>
					),
					tabBarStyle: ((route) => {
						const routeName = getFocusedRouteNameFromRoute(route) ?? ''
						if (routeName === 'ChatScreen') {
							return { display: 'none' }
						}
						return tabBarNavigatorConfig.tabBarStyle
					})(route),
				})}
			/>

			<Screen
				name="AddPostScreen"
				component={AddPostScreen}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="add-circle-outline" size={35} color={color} />
					),
				}}
			/>

			<Screen
				name="Favorite"
				component={FavoriteStackNavigator}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="star-outline" size={size} color={color} />
					),
				}}
			/>
			<Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcon name="account-circle" size={size} color={color} />
					),
				}}
			/>
		</Navigator>
	)
}
