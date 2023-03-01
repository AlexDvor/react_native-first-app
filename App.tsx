import { StartScreen } from 'components/screens/StartScreen'
import { useFonts } from 'expo-font'
import { StyleSheet, Text, View } from 'react-native'

// import { StartScreen } from './app/components/screens/StartScreen'

export default function App() {
	const [fontsLoaded] = useFonts({
		'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return <StartScreen></StartScreen>
}

const styles = StyleSheet.create({})
