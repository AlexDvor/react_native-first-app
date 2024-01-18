import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '~constants/theme'

interface ChatIndicatorProps {
	hasNewMessages: boolean
}

export const ChatIndicator: React.FC<ChatIndicatorProps> = ({
	hasNewMessages,
}) => {
	if (!hasNewMessages) {
		return null
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>●</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 18,
		right: 28,
		backgroundColor: COLORS.messageDotColor,
		borderRadius: 5,
		width: 10,
		height: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 8,
		fontWeight: 'bold',
	},
})
