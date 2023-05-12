import { IAnimalsData } from './animals.types'

export type FavoriteRootStackParamList = {
	FavoriteScreen: undefined
	AnimalProfileScreen: { item: IAnimalsData }
}
