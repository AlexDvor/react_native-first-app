import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '~config/firebaseConfig'

type TAuthStateChanged = {
	email: string | null
	id: string
	name: string | null
} | null

export const useAuthStateChanged = () => {
	const [currentUser, setCurrentUser] = useState<TAuthStateChanged | null>(null)

	useEffect(() => {
		const authStateChanged = async () => {
			try {
				onAuthStateChanged(auth, (user) => {
					if (user) {
						const userUpdatedProfile = {
							email: user.email,
							id: user.uid,
							name: user.displayName,
						}

						setCurrentUser(userUpdatedProfile)
					} else {
						setCurrentUser(null)
					}
				})
			} catch (error) {
				console.log('❌ ~ useAuthStateChanged:', error)
			}
		}

		authStateChanged()
	}, [])

	return { currentUser }
}
