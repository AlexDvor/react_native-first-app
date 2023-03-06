import { IUserProfile } from './user.types'

export interface IAnimalsData {
	id: number
	name: string
	age: number
	imageUrl: string | string[]
	type: 'dog' | 'cat'
	description: string
	gender: 'famale' | 'male'
	weight: number
	vaccine: boolean
	owner: IUserProfile
}
