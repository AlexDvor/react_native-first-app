import { useFonts } from 'expo-font'
import 'react-native-gesture-handler'
import { useAuth } from '~hooks/useAuth'
import { AuthStackNavigator } from '~navigation/AuthStackNavigator'
import { MainStackNavigator } from '~navigation/MainStackNavigator'
import MainProvider from '~provider/MainProvider'

export default function App() {
	const userA = {}
	const { isLoading } = useAuth()
	console.log('❌ ~ user:', isLoading)

	const [fontsLoaded] = useFonts({
		'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
		'OpenSans-Bold': require('./app/assets/fonts/OpenSans-Bold.ttf'),
		'OpenSans-Medium': require('./app/assets/fonts/OpenSans-Medium.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<MainProvider>
			{userA ? <MainStackNavigator /> : <AuthStackNavigator />}
		</MainProvider>
	)
}
