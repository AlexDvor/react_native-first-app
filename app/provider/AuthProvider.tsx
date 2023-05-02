import { FC, useEffect, useState } from 'react'
import { auth } from '~config/firebaseConfig'
import { useActions } from '~hooks/useActions'
import { useAuth } from '~hooks/useAuth'
import { AuthStackNavigator } from '~navigation/AuthStackNavigator'
import { MainStackNavigator } from '~navigation/MainStackNavigator'

const AuthProvider: FC = () => {
	const { user, stateChange } = useAuth()
	const { stateChangeUser } = useActions()

	useEffect(() => {
		stateChangeUser()
		console.log('currentUser', auth.currentUser?.email)
		console.log('STATE', { stateChange, user })
	}, [])

	return <>{user ? <MainStackNavigator /> : <AuthStackNavigator />}</>
}
export default AuthProvider
