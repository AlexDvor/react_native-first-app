import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'
import { AuthService } from '~services/auth/auth.services'

interface InterfaceEmailPassword {
	email: string
	password: string
	name: string
}

//fix type IAuthResponse

type IAuthResponse = any

export const register = createAsyncThunk<IAuthResponse, InterfaceEmailPassword>(
	'auth/register',
	async ({ email, password, name }, thunkAPI) => {
		try {
			const response = await AuthService.register(email, password, name)
			return {
				email: response.user.email,
				id: response.user.uid,
				name: response.user.displayName,
			}
		} catch (error) {
			if (error instanceof FirebaseError) {
				return thunkAPI.rejectWithValue(error.code)
			}
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk(
	'auth/login',
	async (
		{ email, password }: { email: string; password: string },
		thunkAPI
	) => {
		try {
			const response = await AuthService.login(email, password)
			return response.data
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

// export const logout = createAsyncThunk('auth/logout', async () => {
// 	await AuthService.logout()
// })

// export const checkAuth = createAsyncThunk<IAuthResponse>(
// 	'auth/check-auth',
// 	async (_, thunkAPI) => {
// 		try {
// 			const response = await AuthService.getNewTokens()
// 			return response.data
// 		} catch (error) {
// 			if (
// 				errorCatch(error) ===
// 					'Refresh token was expired. Please make a new signin request' ||
// 				errorCatch(error) === 'Refresh token is not in database!' ||
// 				errorCatch(error) === 'Refresh Token is required!'
// 			) {
// 				toastr.error(
// 					'Logout Auth',
// 					'Your authorization is finished, please sign in again'
// 				)
// 				thunkAPI.dispatch(logout())
// 			}
// 			return thunkAPI.rejectWithValue(error)
// 		}
// 	}
// )
