import type { StackScreenProps } from '@react-navigation/stack'

//RootStackParamList
export type HomeRootStackParamList = {
	DefaultHomeScreen: undefined
	AnimalProfileScreen: undefined
}

export type DefaultHomeProps = StackScreenProps<
	HomeRootStackParamList,
	'DefaultHomeScreen'
>

export type ProfileAnimalProps = StackScreenProps<
	HomeRootStackParamList,
	'AnimalProfileScreen'
>
