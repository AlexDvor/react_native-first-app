import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'
import { auth } from '~config/firebaseConfig'

export const AuthService = {
	async register(
		email: string,
		password: string,
		name: string
	): Promise<UserCredential> {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			const currentUser = auth.currentUser

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
				auth,
				email,
				password
			)
			console.log('❌ ~ userCredential1:', userCredential)

			return userCredential
		} catch (error) {
			throw error
		}
	},

	async signOut() {
		try {
			await signOut(auth)
		} catch (error) {
			throw error
		}
	},
}
