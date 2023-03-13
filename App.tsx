import { useFonts } from 'expo-font'
import { StyleSheet } from 'react-native'
import { AnimalProfileScreen } from '~components/screens/AnimalProfileScreen'

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
		<>
			<AnimalProfileScreen />
		</>
	)
}

const styles = StyleSheet.create({})
