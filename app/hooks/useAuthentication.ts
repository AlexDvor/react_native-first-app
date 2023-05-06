import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { firebaseConfig } from '~config/firebaseConfig'

const useAuthentication = () => {
	const [authenticated, setAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const asyncFn = async () => {
			try {
				setIsLoading(true)
				const config = firebaseConfig
				initializeApp(config)
				const auth = getAuth()

				const unsubscribe = auth.onAuthStateChanged((user) => {
					if (user) {
						setAuthenticated(true)
					} else {
						setAuthenticated(false)
					}
				})

				return unsubscribe
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}
		asyncFn()
	}, [])

	return { authenticated, isLoading }
}

export default useAuthentication
