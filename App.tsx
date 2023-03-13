import { useFonts } from 'expo-font'
import { StyleSheet } from 'react-native'
import { AnimalProfileScreen } from '~components/screens/MainScreen/AnimalProfileScreen'
import { HomeScreen } from '~components/screens/MainScreen/HomeScreen'
import { StartScreen } from '~components/screens/MainScreen/StartScreen'

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
			<StartScreen />
			{/* <HomeScreen /> */}
			{/* <AnimalProfileScreen /> */}
		</>
	)
}

const styles = StyleSheet.create({})
