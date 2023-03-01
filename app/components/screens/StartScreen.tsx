import { FC } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

import { bgImage } from '../../constants/images'

export const StartScreen: FC = () => {
	return (
		<View style={styles.container}>
			<ImageBackground source={bgImage} style={styles.image}></ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
})
