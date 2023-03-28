import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { IAnimalsData } from './animals.types'

export type FavoriteRootStackParamList = {
	FavoriteScreen: undefined
	AnimalProfileScreen: { item: IAnimalsData }
}

// export type ChatProps = StackScreenProps<
// 	MessageRootStackParamList,
// 	'ChatScreen'
// >

// export type MessageNavigationComponent =
// 	StackNavigationProp<MessageRootStackParamList>
