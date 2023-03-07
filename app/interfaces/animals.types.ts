import { ImageSourcePropType } from 'react-native'

import { TBreedsCats } from './cat.breeds'
import { TBreedsDogs } from './dog.breeds'
import { IUserProfile } from './user.types'

export interface IAnimalsData {
	id: number
	name: string
	age: number
	breed: TBreedsCats | TBreedsDogs
	imageUrl: ImageSourcePropType
	type: 'dog' | 'cat'
	description: string
	gender: 'famale' | 'male'
	weight: number
	vaccine: boolean
	owner: IUserProfile
}
