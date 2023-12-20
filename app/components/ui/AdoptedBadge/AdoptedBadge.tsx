import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const AdoptedBadge: FC = () => {
	return (
		<View style={styles.adoptedBadge}>
			<Text style={styles.adoptedText}>Adopted</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	adoptedBadge: {
		position: 'absolute',
		top: 10,
		right: 10,
		backgroundColor: 'rgba(255, 0, 0, 0.7)',
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	adoptedText: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
	},
})
