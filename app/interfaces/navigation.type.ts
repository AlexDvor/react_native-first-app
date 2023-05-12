import { NavigationProp } from '@react-navigation/native'
import { MainTabsParamList } from '~navigation/MainStackNavigator'

import { FavoriteRootStackParamList } from './favorite.navigation.types'
import { HomeRootStackParamList } from './home.navigation.types'
import { MessageRootStackParamList } from './message.navigation.types'

type RootStackParamList = MainTabsParamList

export type NavigationType = NavigationProp<RootStackParamList>
