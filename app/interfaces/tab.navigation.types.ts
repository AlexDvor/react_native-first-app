import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native'
import { ProfileRootStackParamList } from '~navigation/ProfileStackNavigator'

import { FavoriteRootStackParamList } from './favorite.navigation.types'
import { HomeRootStackParamList } from './home.navigation.types'
import { MessageRootStackParamList } from './message.navigation.types'

export type MainTabsParamList = {
	Home: NavigatorScreenParams<HomeRootStackParamList> | undefined
	Chat: NavigatorScreenParams<MessageRootStackParamList> | undefined
	AddPostScreen: NavigatorScreenParams<ProfileRootStackParamList> | undefined
	Favorite: NavigatorScreenParams<FavoriteRootStackParamList> | undefined
	Profile: NavigatorScreenParams<ProfileRootStackParamList> | undefined
}

export type RootNavigationApp = NavigationProp<MainTabsParamList>
