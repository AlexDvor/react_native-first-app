import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const RegisterScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>RegisterScreen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: 'red',
		fontSize: 25,
	},
})
