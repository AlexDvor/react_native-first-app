import { createSlice } from '@reduxjs/toolkit'

import { login, register, singOut, stateChangeUser } from './user.actions'

interface initialStateProps {
	user:
		| { name: string | null; id: string | null; email: string | null }
		| null
		| undefined
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
					state.error = 'An unknown error occurred during auth'
				}
			})

			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false
				state.user = null
			})

			.addCase(stateChangeUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(stateChangeUser.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload
				state.stateChange = true
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
	},
})

export const { reducer } = userSlice
