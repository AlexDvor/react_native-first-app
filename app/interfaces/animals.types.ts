import { ImageSourcePropType, ImageURISource } from 'react-native'

import { TBreedsCats } from './cat.breeds'
import { TBreedsDogs } from './dog.breeds'
import { IUserProfile } from './user.types'

interface IImage {
	image: ImageSourcePropType
}

export interface IAnimalsData {
	id: number
	name: string
	color: string
	age: number
	breed: TBreedsCats | TBreedsDogs
	imageUri: IImage[]
	type: 'dog' | 'cat'
	description: string
	gender: 'Female' | 'Male'
	weight: number
	height: number
	vaccine: boolean
	owner: IUserProfile
	behavior: string[]
}
