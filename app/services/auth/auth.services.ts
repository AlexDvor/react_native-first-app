import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import DB from '~config/firebaseConfig'

const auth = getAuth(DB)

export const AuthService = {
	async register(email: string, password: string) {
		const user = await createUserWithEmailAndPassword(auth, email, password)
		return user
	},
}
