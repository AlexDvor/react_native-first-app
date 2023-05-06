import { FC, useEffect } from 'react'
import { auth } from '~config/firebaseConfig'
import { useActions } from '~hooks/useActions'
import { useAuth } from '~hooks/useAuth'
import { useAuthStateChanged } from '~hooks/useAuthStateChanged'
import { AuthStackNavigator } from '~navigation/AuthStackNavigator'
import { MainStackNavigator } from '~navigation/MainStackNavigator'

const AuthProvider: FC = () => {
	const { user, stateChange } = useAuth()
	const { stateChangeUser } = useActions()
	const { currentUser } = useAuthStateChanged()

	useEffect(() => {
		stateChangeUser(currentUser)
	}, [currentUser])

	return (
		<>{user && stateChange ? <MainStackNavigator /> : <AuthStackNavigator />}</>
	)
}
export default AuthProvider
