import React, { FC } from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { widthScreen } from '~constants/theme'

interface ISliderItemProps {
	image: ImageSourcePropType
}

export const SliderItem: FC<ISliderItemProps> = ({ image }) => {
	return (
		<>
			<View style={[styles.imageWrapper, styles.relative]}>
				<Image style={styles.image} source={image} />
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	imageWrapper: {
		width: widthScreen,
		marginBottom: 15,
	},

	relative: {
		position: 'relative',
	},

	image: { width: widthScreen, height: 400 },
})
