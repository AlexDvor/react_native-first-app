import { ImageSourcePropType, ImageURISource } from 'react-native'

import { IUserProfile } from './user.types'

interface IImage {
	image: ImageSourcePropType
}
// 'Female' | 'Male'

export interface IAnimalsData {
	[key: string]: any
	id: number
	name: string
	color: string
	age: number
	breed: string
	imageUri: IImage[]
	type: string
	description: string
	gender: string
	weight: number
	height: number
	vaccine: boolean
	owner: IUserProfile
	behavior: string[]
}
