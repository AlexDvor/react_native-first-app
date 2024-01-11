import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth'
import { FIREBASE_AUTH } from '~config/firebaseConfig'
import { IUpdOwnProfile } from '~interfaces/user.types'
import { UserService } from '~services/user.services'

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

			if (currentUser) {
				await updateProfile(currentUser, { displayName: name })
				const userData: IUpdOwnProfile = {
					name,
					avatar: currentUser.photoURL || null,
					email: currentUser.email || null,
					emailVerified: currentUser.emailVerified || false,
					phoneNumber: currentUser.phoneNumber || null,
					location: null,
				}

				await UserService.creatingOwnerProfile(currentUser.uid, userData)

				return userCredential
			}

			return userCredential
		} catch (error) {
			console.log(' AuthService register:', error)
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
