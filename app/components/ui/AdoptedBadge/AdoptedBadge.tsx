import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type TSize = 'sm' | 'lg'
interface IAdoptedBadge {
	size?: TSize
}

export const AdoptedBadge: FC<IAdoptedBadge> = ({ size = 'lg' }) => {
	return (
		<View
			style={[
				styles.adoptedBadge,
				size === 'sm'
					? { paddingHorizontal: 6, paddingVertical: 5 }
					: { paddingHorizontal: 12, paddingVertical: 6 },
			]}
		>
			<Text
				style={[
					styles.text,
					size === 'sm' ? { fontSize: 10 } : { fontSize: 14 },
				]}
			>
				Adopted
			</Text>
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
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	text: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
	},
})
