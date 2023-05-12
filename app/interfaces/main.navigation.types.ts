import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { FavoriteRootStackParamList } from './favorite.navigation.types'

export type MainTabsParamList = {
	Home: undefined
	Chat: undefined
	AddPostScreen: undefined
	Favorite: FavoriteRootStackParamList
	Profile: undefined
}

export type ChatScreenRouteProp = RouteProp<MainTabsParamList, 'Chat'>

export type MainStackNavigationProp = BottomTabNavigationProp<MainTabsParamList>
