import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
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
		await AuthService.signOut
	} catch (error) {
		console.log(error)
		return thunkAPI.rejectWithValue(error)
	}
})

export const stateChangeUser = createAsyncThunk(
	'auth/stateChangeUser',
	async (_, thunkAPI) => {
		try {
			const user = await AuthService.authStateChangeUser()
			console.log('❌ ~ stateChangeUser:', user)
			return user
		} catch (error) {
			console.log(error)
			return thunkAPI.rejectWithValue(error)
		}
	}
)
