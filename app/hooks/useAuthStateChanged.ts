// import { useAsyncStorage } from '@react-native-async-storage/async-storage'
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

		const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
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
		return () => unregisterAuthObserver()
	}, [])

	return { currentUser }
}
