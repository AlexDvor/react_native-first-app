import { TNotification } from './notification'

export interface IUserProfile {
	id: string
	name: string | null
	email: string | null
	avatar: string | null
	phoneNumber: string | null
	emailVerified: boolean
	location?: {
		latitude: number
		longitude: number
	} | null
}

export type IUpdOwnProfile = Omit<IUserProfile, 'id'>

export interface IUserData extends IUserProfile {
	chats: []
	ownAnimals: string[]
	notifications: TNotification[]
	favorites: string[]
}
export interface IUserInitialState {
	user: IUserProfile | null
	isLoading: boolean
}

// export interface IAllCollectionsUser {
// 	[key: string]: any
// 	name: string
// 	avatar: string
// 	chat: string[]
// 	favorites: string[]
// 	notifications: TNotification[]
// 	ownAnimals: string[]
// }

// export interface IUserState {
// 	email: string
// 	isAdmin: boolean
// }

// export interface ITokens {
// 	accessToken: string
// 	refreshToken: string
// }

// export interface IUserInitialState {
// 	user: IUserState | null
// 	isLoading: boolean
// }

// export interface InterfaceEmailPassword {
// 	email: string
// 	password: string
// }

// export interface ISaveToStorage {
// 	user: IUser & ITokens
// }

// export interface IAuthResponse extends ITokens {
// 	status: string
// 	code: number
// 	user: IUser & {
// 		isAdmin: boolean
// 	}
// }
