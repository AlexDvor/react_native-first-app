import type { StackScreenProps } from '@react-navigation/stack'
import { StackNavigationProp } from '@react-navigation/stack'

export type THomeScreenName = 'AnimalProfileScreen'

export type HomeRootStackParamList = {
	DefaultHomeScreen: undefined
	AnimalProfileScreen: { itemId: number }
}

export type DefaultHomeProps = StackScreenProps<
	HomeRootStackParamList,
	'DefaultHomeScreen'
>

export type ProfileAnimalProps = StackScreenProps<
	HomeRootStackParamList,
	'AnimalProfileScreen'
>

export type TNavigationComponent = StackNavigationProp<HomeRootStackParamList>
