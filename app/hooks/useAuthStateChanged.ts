// import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '~config/firebaseConfig'
import { AuthStateChanged } from '~store/user/user.actions'

export const useAuthStateChanged = () => {
	const [currentUser, setCurrentUser] = useState<AuthStateChanged | null>(null)
	// const { removeItem, setItem, getItem } = useAsyncStorage('user')

	// const getItemFromStorage = async () => {
	// 	const res = await getItem()
	// 	if (res) return JSON.parse(res)
	// 	else return null
	// }

	// const removeItemFromStorage = async () => {
	// 	await removeItem()
	// }

	// const writeItemToStorage = async (newValue: any | null) => {
	// 	await setItem(JSON.stringify(newValue))
	// }

	useEffect(() => {
		// const authStateChanged = async () => {
		// 	try {
		// 		await onAuthStateChanged(auth, (user) => {
		// 			if (user) {
		// 				const userUpdatedProfile = {
		// 					email: user.email,
		// 					id: user.uid,
		// 					name: user.displayName,
		// 				}

		// 				setCurrentUser(userUpdatedProfile)
		// 			} else {
		// 				setCurrentUser(null)
		// 			}
		// 		})
		// 	} catch (error) {
		// 		console.log(error)
		// 	}
		// }

		// authStateChanged()

		const unregisterAuthObserver = onAuthStateChanged(FIREBASE_AUTH, (user) => {
			if (user) {
				const userUpdatedProfile = {
					id: user.uid,
					name: user.displayName,
					email: user.email,
					avatar: user.photoURL,
					emailVerified: user.emailVerified,
					phoneNumber: user.phoneNumber,
				}
				console.log('❌ ~ userUpdatedProfile:', userUpdatedProfile)
				setCurrentUser(userUpdatedProfile)
			} else {
				setCurrentUser(null)
			}
		})
		return () => unregisterAuthObserver()
	}, [])

	return { currentUser }
}
