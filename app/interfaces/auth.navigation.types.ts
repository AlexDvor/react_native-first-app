import { StackNavigationProp } from '@react-navigation/stack'

export type AuthRootStackParamList = {
	SignUp: undefined
	SignIn: undefined
}

export type AuthNavigationComponent =
	StackNavigationProp<AuthRootStackParamList>
