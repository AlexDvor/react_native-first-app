import { FC } from 'react'
import { useAuth } from '~hooks/useAuth'
import { AuthStackNavigator } from '~navigation/AuthStackNavigator'
import { MainStackNavigator } from '~navigation/MainStackNavigator'

const AuthProvider: FC = () => {
	const { user } = useAuth()

	return <>{user ? <MainStackNavigator /> : <AuthStackNavigator />}</>
}

export default AuthProvider
