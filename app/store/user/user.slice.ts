import { createSlice } from '@reduxjs/toolkit'

import { login, register } from './user.actions'

interface initialStateProps {
	user: { name: string | null; id: string | null; email: string | null } | null
	isLoading: boolean
	error: string
}

const initialState: initialStateProps = {
	user: null,
	isLoading: false,
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
		// .addCase(logout.fulfilled, (state) => {
		// 	state.isLoading = false
		// 	state.user = null
		// })
		// .addCase(checkAuth.fulfilled, (state, { payload }) => {
		// 	state.user = payload.user
		// })
		// .addCase(checkAuth.rejected, (state) => {
		// 	state.user = null
		// 	state.isLoading = false
		// })
	},
})

export const { reducer } = userSlice
