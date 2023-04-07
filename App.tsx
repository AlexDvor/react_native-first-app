import { useFonts } from 'expo-font'
import 'react-native-gesture-handler'
import { AuthStackNavigator } from '~navigation/AuthStackNavigator'
import MainProvider from '~provider/MainProvider'

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
		<MainProvider>
			<AuthStackNavigator />
		</MainProvider>
	)
}
