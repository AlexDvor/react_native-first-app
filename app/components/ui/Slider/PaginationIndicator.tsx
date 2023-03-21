import { FC } from 'react'
import { Animated, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { widthScreenDevice } from '~constants/theme'

interface PaginationIndicatorProps {
	data: { image: ImageSourcePropType }[]
	scrollX: any
	index: number
}

export const PaginationIndicator: FC<PaginationIndicatorProps> = ({
	data,
	scrollX,
	index,
}) => {
	return (
		<View style={styles.container}>
			{data.map((_: any, idx: number) => {
				const inputRange = [
					(idx - 1) * widthScreenDevice,
					idx * widthScreenDevice,
					(idx + 1) * widthScreenDevice,
				]

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [12, 30, 12],
					extrapolate: 'clamp',
				})

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [12, 30, 12],
					// outputRange: [0.2, 1, 0.1],
					extrapolate: 'clamp',
				})
				return (
					<Animated.View
						key={idx.toString()}
						style={[
							styles.dot,
							{ width: dotWidth, opacity },
							idx === index && styles.dotActive,
						]}
					></Animated.View>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		position: 'absolute',
		top: 430,
		right: 20,
	},

	dot: {
		width: 20,
		height: 10,
		backgroundColor: '#cccac4',
		marginLeft: 5,
		borderRadius: 5,
	},

	dotActive: {
		backgroundColor: '#F8F8F8',
	},
})
