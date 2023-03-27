import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ChatProps } from '../messageNavigation.types'

export const ChatScreen: FC<ChatProps> = ({ route }) => {
	const userData = route.params.user
	console.log('❌ ~ userData:', userData)
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{String(userData)}</Text>
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
