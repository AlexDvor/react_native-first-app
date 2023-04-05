export interface IUserProfile {
	id: number
	name: string
}

export interface IUserInitialState {
	user: IUserProfile | null
	isLoading: boolean
}
