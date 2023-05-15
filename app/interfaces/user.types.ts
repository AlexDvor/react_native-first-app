export interface IUserProfile {
	id: number
	name: string
	avatar: string | null
}

export interface IUserInitialState {
	user: IUserProfile | null
	isLoading: boolean
}

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
