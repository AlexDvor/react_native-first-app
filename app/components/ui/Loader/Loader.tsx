import { FC } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const Loader: FC = () => {
	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size="large" color="white" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
})
