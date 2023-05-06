import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'
import { AuthService } from '~services/auth/auth.services'

interface InterfaceEmailPassword {
	email: string
	password: string
	name: string
}

type AuthStateChanged = {
	email: string | null
	id: string
	name: string | null
} | null

//fix type IAuthResponse

type IAuthResponse = any

export const register = createAsyncThunk<IAuthResponse, InterfaceEmailPassword>(
	'auth/register',
	async ({ email, password, name }, thunkAPI) => {
		try {
			const { user } = await AuthService.register(email, password, name)
			return {
				email: user.email,
				id: user.uid,
				name: user.displayName,
			}
		} catch (error) {
			if (error instanceof FirebaseError) {
				return thunkAPI.rejectWithValue(error.code)
			}
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, InterfaceEmailPassword>(
	'auth/login',
	async (
		{ email, password }: { email: string; password: string },
		thunkAPI
	) => {
		try {
			const { user } = await AuthService.login(email, password)
			return { email: user.email, id: user.uid, name: user.displayName }
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(error)
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

export const authentication = createAsyncThunk(
	'auth/authentication',
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
