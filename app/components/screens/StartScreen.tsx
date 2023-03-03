import { PrimaryButton } from 'components/ui/PrimaryButton'
import { bgImage } from 'constants/images'
import { FONTS } from 'constants/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'

export const StartScreen: FC = () => {
	return (
		<View style={styles.container}>
			<ImageBackground source={bgImage} style={styles.backgroundImage}>
				<LinearGradient
					// Background Linear Gradient
					colors={['rgba(47, 48, 58, 0.9)', 'transparent']}
					style={styles.background}
				/>
				<Text style={styles.text}>Happiness is closer than you think</Text>
				<View style={styles.containerBtn}>
					<PrimaryButton title="Let's Go!" />
				</View>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	background: {
		flex: 1,
	},
	containerBtn: {
		marginHorizontal: 30,
		marginBottom: 50,
	},
	text: {
		...FONTS.h1,
		color: '#F8F8F8',
		textAlign: 'center',
		marginHorizontal: 30,
		marginBottom: 60,
	},
})
