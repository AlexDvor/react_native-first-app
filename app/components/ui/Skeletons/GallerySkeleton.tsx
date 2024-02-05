import React, { FC } from 'react'
import ContentLoader, {
	IContentLoaderProps,
	Rect,
} from 'react-content-loader/native'
import { StyleSheet, View } from 'react-native'
import { heightScreenDevice, widthScreenDevice } from '~constants/theme'

export const GallerySkeleton: FC = (
	props: JSX.IntrinsicAttributes & IContentLoaderProps
) => {
	const widthRect = `${widthScreenDevice / 2 - 20}`
	const setViewBox = `0 0 ${widthScreenDevice - 20} ${heightScreenDevice - 20}`

	return (
		<View style={styles.container}>
			<ContentLoader
				speed={2}
				width={widthScreenDevice - 20}
				height={heightScreenDevice - 20}
				viewBox={setViewBox}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<Rect x="0" y="0" rx="8" ry="8" width={widthRect} height="120" />
				<Rect x="0" y="135" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="0" y="155" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="0" y="175" rx="3" ry="3" width={widthRect} height="10" />

				<Rect x="200" y="0" rx="8" ry="8" width={widthRect} height="120" />
				<Rect x="200" y="135" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="200" y="155" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="200" y="175" rx="3" ry="3" width={widthRect} height="10" />

				<Rect x="0" y="200" rx="8" ry="8" width={widthRect} height="120" />
				<Rect x="0" y="335" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="0" y="355" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="0" y="375" rx="3" ry="3" width={widthRect} height="10" />

				<Rect x="200" y="200" rx="8" ry="8" width={widthRect} height="120" />
				<Rect x="200" y="335" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="200" y="355" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="200" y="375" rx="3" ry="3" width={widthRect} height="10" />

				<Rect x="0" y="400" rx="8" ry="8" width={widthRect} height="120" />
				<Rect x="0" y="535" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="0" y="555" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="0" y="575" rx="3" ry="3" width={widthRect} height="10" />

				<Rect x="200" y="400" rx="8" ry="8" width={widthRect} height="120" />
				<Rect x="200" y="535" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="200" y="555" rx="3" ry="3" width={widthRect} height="10" />
				<Rect x="200" y="575" rx="3" ry="3" width={widthRect} height="10" />

				<Rect x="0" y="600" rx="8" ry="8" width={widthRect} height="120" />
				<Rect x="200" y="600" rx="8" ry="8" width={widthRect} height="120" />
			</ContentLoader>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
})
