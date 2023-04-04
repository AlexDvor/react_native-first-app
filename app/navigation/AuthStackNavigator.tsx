import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { LoginScreen } from '~components/screens/AuthScreen/LoginScreen'
import { RegisterScreen } from '~components/screens/AuthScreen/RegisterScreen'
import { AuthRootStackParamList } from '~interfaces/auth.navigation.types'

const AuthStack = createStackNavigator<AuthRootStackParamList>()

export const AuthStackNavigator: FC = () => {
	const { Navigator, Screen } = AuthStack
	return (
		<Navigator screenOptions={{ headerShown: false }} initialRouteName="SignUp">
			<Screen name="SignUp" component={RegisterScreen}></Screen>
			<Screen name="SignIn" component={LoginScreen}></Screen>
		</Navigator>
	)
}
