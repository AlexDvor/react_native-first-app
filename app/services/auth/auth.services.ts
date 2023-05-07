import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'
import { FIREBASE_AUTH } from '~config/firebaseConfig'

export const AuthService = {
	async register(
		email: string,
		password: string,
		name: string
	): Promise<UserCredential> {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				FIREBASE_AUTH,
				email,
				password
			)

			const currentUser = FIREBASE_AUTH.currentUser

			if (currentUser !== null) {
				await updateProfile(currentUser, { displayName: name })
				return userCredential
			}

			return userCredential
		} catch (error) {
			throw error
		}
	},

	async login(email: string, password: string): Promise<UserCredential> {
		try {
			const userCredential = await signInWithEmailAndPassword(
				FIREBASE_AUTH,
				email,
				password
			)

			return userCredential
		} catch (error) {
			throw error
		}
	},

	async signOut() {
		try {
			await signOut(FIREBASE_AUTH)
		} catch (error) {
			throw error
		}
	},
}
