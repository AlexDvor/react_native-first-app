import { ImageSourcePropType } from 'react-native'
import { TUserLocationCoords } from '~services/location.services'

export interface IOwnerInfo {
	id: string
	name: string
	avatar: string | null
	location?: TUserLocationCoords
}

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
	owner: IOwnerInfo
	adoptedByUser: IOwnerInfo | null
	createdAt: string
}
