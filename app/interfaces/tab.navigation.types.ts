import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import { FavoriteRootStackParamList } from './favorite.navigation.types'
import { HomeRootStackParamList } from './home.navigation.types'
import { MessageRootStackParamList } from './message.navigation.types'

export type MainTabsParamList = {
	Home: HomeRootStackParamList
	Chat: MessageRootStackParamList
	AddPostScreen: undefined
	Favorite: FavoriteRootStackParamList
	Profile: undefined
}

export type MainStackNavigationProp = BottomTabNavigationProp<MainTabsParamList>
