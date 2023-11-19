import { ImageSourcePropType } from 'react-native'

import { IUserProfile } from './user.types'

export interface IAnimalsData {
	[key: string]: any
	id: string
	name: string
	color: string
	age: { year: number; month: number; day: number }
	breed: string
	imageUri: ImageSourcePropType[]
	type: string
	description: string
	gender: string
	weight: number | string
	vaccine: boolean
	owner: IUserProfile
	adoptedByUser: IUserProfile | null
	createdAt: string
}
