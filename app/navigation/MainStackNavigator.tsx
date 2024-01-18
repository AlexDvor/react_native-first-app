import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { AddPostScreen } from '~components/screens/MainScreen/AddPostScreen'
import { ChatIndicator } from '~components/ui/ChatIndicator/ChatIndicator'
import { tabBarNavigatorConfig } from '~config/tabBarNavigator.config'
import { MainTabsParamList } from '~interfaces/tab.navigation.types'

import { FavoriteStackNavigator } from './FavoriteStackNavigator'
import { HomeStackNavigator } from './HomeStackNavigator'
import { MessageStackNavigator } from './MessageStackNavigator'
import { ProfileStackNavigator } from './ProfileStackNavigator'

const MainTabs = createBottomTabNavigator<MainTabsParamList>()

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
						<>
							<Ionicons
								name="chatbubble-ellipses-outline"
								size={size}
								color={color}
							/>
							<ChatIndicator hasNewMessages={true} />
						</>
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
				component={ProfileStackNavigator}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcon name="account-circle" size={size} color={color} />
					),
				}}
			/>
		</Navigator>
	)
}
export { MainTabsParamList }
