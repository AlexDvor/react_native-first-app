import { COLORS } from 'constants/theme'
import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface IPrimaryBtn {
	title: string
	onPress?: () => void
}

export const PrimaryButton: FC<IPrimaryBtn> = ({ title }) => {
	return (
		<TouchableOpacity style={styles.containerBtn}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	containerBtn: {
		backgroundColor: COLORS.primaryBtn,
		height: 50,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: COLORS.textColorBtn,
	},
})
