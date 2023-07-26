import { FC } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

interface ISpinner {
	customColor?: string
}

export const Spinner: FC<ISpinner> = ({ customColor = '#F2968F' }) => {
	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size="large" color={customColor} />
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
