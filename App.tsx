import { StartScreen } from 'components/screens/StartScreen'
import { useFonts } from 'expo-font'
import { StyleSheet } from 'react-native'

export default function App() {
	const [fontsLoaded] = useFonts({
		'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
		'OpenSans-Bold': require('./app/assets/fonts/OpenSans-Bold.ttf'),
		'OpenSans-Medium': require('./app/assets/fonts/OpenSans-Medium.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return <StartScreen></StartScreen>
}

const styles = StyleSheet.create({})
