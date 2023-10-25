import { FC } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { COLORS } from '~constants/theme'

interface ISpinner {
	customColor?: string
}

export const Spinner: FC<ISpinner> = ({
	customColor = COLORS.spinnerColor,
}) => {
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
