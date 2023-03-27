import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FavoriteScreen } from '~components/screens/MainScreen/FavoriteScreen'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen'

import { HomeStackNavigator } from './HomeStackNavigator'
import { MessageStackNavigator } from './MessageStackNavigator'

const MainTabs = createBottomTabNavigator()

const screenConfig = {
	headerShown: false,
	tabBarShowLabel: false,
}

export const MainStackNavigator = () => {
	const { Navigator, Screen } = MainTabs
	return (
		<Navigator screenOptions={screenConfig} initialRouteName="Home">
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
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons
							name="chatbubble-ellipses-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Screen
				name="Favorite"
				component={FavoriteScreen}
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
