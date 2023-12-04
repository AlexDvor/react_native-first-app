import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	IHandlerAuthErrors,
	handlerAuthErrors,
} from '~helper/firebase/handlerAuthErrors'
import { IUserProfile } from '~interfaces/user.types'
import { AuthService } from '~services/auth/auth.services'

interface InterfaceLogin {
	email: string
	password: string
}

interface InterfaceEmailPassword {
	email: string
	password: string
	name: string
}

export type AuthStateChanged = {
	id: string
	name: string | null
	email: string | null
	avatar: string | null
	phoneNumber: string | null
	emailVerified: boolean
} | null

export const register = createAsyncThunk<IUserProfile, InterfaceEmailPassword>(
	'auth/register',
	async ({ email, password, name }, thunkAPI) => {
		try {
			const { user } = await AuthService.register(email, password, name)
			const userInfo: IUserProfile = {
				id: user.uid,
				name: user.displayName,
				email: user.email,
				avatar: user.photoURL,
				emailVerified: user.emailVerified,
				phoneNumber: user.phoneNumber,
			}
			return userInfo
		} catch (error) {
			return thunkAPI.rejectWithValue(
				handlerAuthErrors(error as IHandlerAuthErrors)
			)
		}
	}
)

export const login = createAsyncThunk<IUserProfile, InterfaceLogin>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const { user } = await AuthService.login(email, password)
			const userInfo: IUserProfile = {
				id: user.uid,
				name: user.displayName,
				email: user.email,
				avatar: user.photoURL,
				emailVerified: user.emailVerified,
				phoneNumber: user.phoneNumber,
			}

			return userInfo
		} catch (error) {
			return thunkAPI.rejectWithValue(
				handlerAuthErrors(error as IHandlerAuthErrors)
			)
		}
	}
)

export const singOut = createAsyncThunk('auth/singOut', async (_, thunkAPI) => {
	try {
		await AuthService.signOut()
	} catch (error) {
		console.log(error)
		return thunkAPI.rejectWithValue(error)
	}
})

export const stateChangeUser = createAsyncThunk(
	'auth/stateChangeUser',
	async (data: AuthStateChanged, thunkAPI) => {
		try {
			if (data) {
				return data
			} else {
				return null
			}
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const resetError = createAsyncThunk(
	'error/reset',
	async (_, thunkAPI) => {}
)
