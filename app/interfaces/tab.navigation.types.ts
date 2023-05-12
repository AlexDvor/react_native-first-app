import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native'

import { FavoriteRootStackParamList } from './favorite.navigation.types'
import { HomeRootStackParamList } from './home.navigation.types'
import { MessageRootStackParamList } from './message.navigation.types'

// export type MainTabsParamList = {
// 	Home: HomeRootStackParamList
// 	Chat: MessageRootStackParamList
// 	AddPostScreen: undefined
// 	Favorite: FavoriteRootStackParamList
// 	Profile: undefined
// }

export type MainTabsParamList = {
	Home: NavigatorScreenParams<HomeRootStackParamList> | undefined
	Chat: NavigatorScreenParams<MessageRootStackParamList> | undefined
	AddPostScreen: undefined
	Favorite: NavigatorScreenParams<FavoriteRootStackParamList> | undefined
	Profile: undefined
}

export type RootNavigationApp = NavigationProp<MainTabsParamList>
