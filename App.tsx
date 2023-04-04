import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import 'react-native-gesture-handler'
import { LoginScreen } from '~components/screens/AuthScreen/LoginScreen'
import { RegisterScreen } from '~components/screens/AuthScreen/RegisterScreen'
import { AuthStackNavigator } from '~navigation/AuthStackNavigator'
import { MainStackNavigator } from '~navigation/MainStackNavigator'

export default function App() {
	const [fontsLoaded] = useFonts({
		'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
		'OpenSans-Bold': require('./app/assets/fonts/OpenSans-Bold.ttf'),
		'OpenSans-Medium': require('./app/assets/fonts/OpenSans-Medium.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<NavigationContainer>
			{/* <MainStackNavigator /> */}
			<AuthStackNavigator />
		</NavigationContainer>
	)
}
