import type { StackScreenProps } from '@react-navigation/stack'
import { StackNavigationProp } from '@react-navigation/stack'
import { IAnimalsData } from '~interfaces/animals.types'
import { TNotification } from '~services/user/notification.services'

export type THomeScreenName = 'AnimalProfileScreen'

export type HomeRootStackParamList = {
	HomeScreen: undefined
	AnimalProfileScreen: { item: IAnimalsData }
	ChatScreen: { chatId: string }
	NotificationScreen: undefined
	NotificationItemScreen: { message: TNotification }
}

export type DefaultHomeProps = StackScreenProps<
	HomeRootStackParamList,
	'HomeScreen'
>

export type ProfileAnimalProps = StackScreenProps<
	HomeRootStackParamList,
	'AnimalProfileScreen'
>

export type NotificationItemProps = StackScreenProps<
	HomeRootStackParamList,
	'NotificationItemScreen'
>

export type TNavigationComponent = StackNavigationProp<HomeRootStackParamList>
