import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'
import { bgImage } from '~constants/images'

interface BackgroundAuthLayoutProps {
	children: JSX.Element | JSX.Element[]
}

export const BackgroundAuthLayout: FC<BackgroundAuthLayoutProps> = ({
	children,
}) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ImageBackground source={bgImage} style={styles.backgroundImage}>
				<LinearGradient
					colors={['rgba(47, 48, 58, 0.4)', 'rgba(47, 48, 58, 0.4)']}
					style={styles.gradient}
				/>
				{children}
			</ImageBackground>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backgroundImage: {
		position: 'relative',
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
	},

	gradient: {
		flex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
	},
})
