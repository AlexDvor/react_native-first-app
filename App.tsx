import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
	const [fontsLoaded] = useFonts({
		'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<View style={styles.container}>
			<Text style={styles.font}>Hellokkk!</Text>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	font: {
		fontSize: 20,
		color: '#37E39F',
		// fontFamily: 'OpenSans-Regular',
		// fontWeight: '700',
	},
})
