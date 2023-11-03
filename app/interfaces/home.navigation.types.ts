import type { StackScreenProps } from '@react-navigation/stack'
import { StackNavigationProp } from '@react-navigation/stack'
import { IAnimalsData } from '~interfaces/animals.types'

export type THomeScreenName = 'AnimalProfileScreen'

export type HomeRootStackParamList = {
	HomeScreen: undefined
	AnimalProfileScreen: { item: IAnimalsData }
	ChatScreen: { chatId: string }
	NotificationScreen: undefined
}

export type DefaultHomeProps = StackScreenProps<
	HomeRootStackParamList,
	'HomeScreen'
>

export type ProfileAnimalProps = StackScreenProps<
	HomeRootStackParamList,
	'AnimalProfileScreen'
>

export type TNavigationComponent = StackNavigationProp<HomeRootStackParamList>
