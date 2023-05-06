import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { signInWithCustomToken } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { asyncStorageConfig } from '~config/asyncStorage.config'
import { auth } from '~config/firebaseConfig'

const useAuthentication = () => {
	const [authenticated, setAuthenticated] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { removeItem, setItem, getItem } = useAsyncStorage(
		asyncStorageConfig.storageName.userId
	)

	useEffect(() => {
		const asyncFn = async () => {
			try {
				const storageToken = await getItem()
				if (storageToken) {
					const parseStorageToken = JSON.parse(storageToken)
					if (parseStorageToken) {
						setAuthenticated(parseStorageToken)
						signInWithCustomToken(auth, parseStorageToken)
							.then((userCredential) => {
								// Користувач успішно аутентифікований
								const user = userCredential.user
								console.log('Authenticated user:', user.uid)
							})
							.catch((error) => {
								console.error(error)
							})
					}
				}

				// if (storage) {
				// 	const userCredential = await signInWithCustomToken(
				// 		auth,
				// 		storage.token
				// 	)
				// 	console.log('❌ ~ userCredential:', userCredential)
				// }
			} catch (error) {}
		}
		asyncFn()
	}, [])

	return { authenticated, isLoading }
}

export default useAuthentication
