import {
	UserCredential,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'
import { auth } from '~config/firebaseConfig'

type TAuthStateChanged =
	| {
			email: string
			id: string
			name: string
	  }
	| null
	| undefined

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

			return userCredential
		} catch (error) {
			throw error
		}
	},

	async signOut(): Promise<void> {
		try {
			await signOut(auth)
		} catch (error) {
			throw error
		}
	},

	async authStateChangeUser(): Promise<TAuthStateChanged> {
		let userData
		await onAuthStateChanged(auth, (user) => {
			if (user) {
				const userUpdatedProfile = {
					email: user.email,
					id: user.uid,
					name: user.displayName,
				}
				userData = userUpdatedProfile
			} else {
				userData = null
			}
		})
		return userData
	},
}
