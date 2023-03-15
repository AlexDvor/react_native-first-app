import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ChatScreen } from '~components/screens/MainScreen/ChatScreen/ChatScreen'
import { FavoriteScreen } from '~components/screens/MainScreen/FavoriteScreen/FavoriteScreen'
import { HomeRootNavigator } from '~components/screens/MainScreen/HomeScreen/HomeRootNavigator'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen/ProfileScreen'

const MainTabs = createBottomTabNavigator()

export const MainNavigator = () => {
	const { Navigator, Screen } = MainTabs
	return (
		<Navigator
			screenOptions={{ headerShown: false, tabBarShowLabel: false }}
			initialRouteName="Home"
		>
			<Screen
				name="Home"
				component={HomeRootNavigator}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="home-outline" size={size} color={color} />
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
			<Screen
				name="Chat"
				component={ChatScreen}
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
		</Navigator>
	)
}
