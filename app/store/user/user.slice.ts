import { createSlice } from '@reduxjs/toolkit'

import {
	login,
	register,
	resetError,
	singOut,
	stateChangeUser,
	updateUser,
} from './user.actions'

export interface initialStateProps {
	user: {
		id: string | null
		name: string | null
		email: string | null
		avatar: string | null
		phoneNumber: string | null
		emailVerified: boolean
		location?: {
			latitude: number
			longitude: number
		} | null
	} | null

	isLoading: boolean
	stateChange: boolean
	error: string
}

const initialState: initialStateProps = {
	user: null,
	isLoading: false,
	stateChange: false,
	error: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null

				if (typeof payload === 'string') {
					state.error = payload
				} else {
					state.error = 'An unknown error occurred during sign up operation'
				}
			})

			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null

				if (typeof payload === 'string') {
					state.error = payload
				} else {
					state.error = 'An unknown error occurred during log in operation'
				}
			})

			.addCase(stateChangeUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(stateChangeUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload || null
				if (payload) {
					state.stateChange = true
				} else {
					state.stateChange = false
				}
			})
			.addCase(stateChangeUser.rejected, (state) => {
				state.isLoading = false
				state.user = null
				state.stateChange = false
			})

			.addCase(singOut.pending, (state) => {
				state.isLoading = true
			})
			.addCase(singOut.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.stateChange = false
			})
			.addCase(singOut.rejected, (state) => {
				state.isLoading = false
				state.user = null
				state.error = 'Something is wrong with sing Out operation'
			})

			.addCase(resetError.fulfilled, (state) => {
				state.error = ''
			})

			.addCase(updateUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null

				if (typeof payload === 'string') {
					state.error = payload
				} else {
					state.error = 'An unknown error occurred during log in operation'
				}
			})
	},
})

export const { reducer } = userSlice
