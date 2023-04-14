import { ImageSourcePropType, ImageURISource } from 'react-native'

import { IUserProfile } from './user.types'

interface IImage {
	image: ImageSourcePropType
}

export interface IAnimalsData {
	id: number
	name: string
	color: string
	age: number
	breed: string
	imageUri: IImage[]
	type: 'Dog' | 'Cat'
	description: string
	gender: 'Female' | 'Male'
	weight: number
	height: number
	vaccine: boolean
	owner: IUserProfile
	behavior: string[]
}
