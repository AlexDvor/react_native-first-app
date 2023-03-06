import { Logo } from 'components/ui/Logo'
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
					colors={['rgba(47, 48, 58, 0.4)', 'rgba(47, 48, 58, 0.4)']}
					style={styles.gradient}
				/>
				<View style={styles.logoWrapper}>
					<Logo logoColor="#F8F8F8" />
				</View>

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
	},
	backgroundImage: {
		position: 'relative',
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	},
	gradient: {
		flex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
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
	logoWrapper: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 90,
	},
})
