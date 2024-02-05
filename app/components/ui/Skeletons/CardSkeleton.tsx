import React, { FC } from 'react'
import ContentLoader, {
	Circle,
	IContentLoaderProps,
	Rect,
} from 'react-content-loader/native'
import { StyleSheet, View } from 'react-native'
import { COLORS, heightScreenDevice, widthScreenDevice } from '~constants/theme'

export const CardSkeleton: FC = (
	props: JSX.IntrinsicAttributes & IContentLoaderProps
) => {
	const widthR = widthScreenDevice
	const widthF = widthScreenDevice / 4 - 15
	const setViewBox = `0 0 ${widthScreenDevice} ${heightScreenDevice - 20}`

	return (
		<View style={styles.container}>
			<ContentLoader
				speed={2}
				width={widthScreenDevice}
				height={heightScreenDevice}
				viewBox={setViewBox}
				backgroundColor={COLORS.skeletonBackgroundColor}
				foregroundColor={COLORS.skeletonForegroundColor}
			>
				<Rect x="0" y="0" rx="8" ry="8" width={widthR} height="450" />
				<Rect x="10" y="470" rx="5" ry="5" width={70} height="10" />
				<Rect x="10" y="490" rx="5" ry="5" width={90} height="10" />

				<Rect x="15" y="520" rx="15" ry="15" width={widthF} height="60" />
				<Rect x="115" y="520" rx="15" ry="15" width={widthF} height="60" />
				<Rect x="215" y="520" rx="15" ry="15" width={widthF} height="60" />
				<Rect x="315" y="520" rx="15" ry="15" width={widthF} height="60" />

				<Circle cx="40" cy="640" r="30" />
				<Rect x="75" y="625" rx="5" ry="5" width={70} height="10" />
				<Rect x="75" y="645" rx="5" ry="5" width={80} height="10" />

				<Rect x="10" y="700" rx="5" ry="5" width={widthR - 20} height="10" />
				<Rect x="10" y="720" rx="5" ry="5" width={widthR - 20} height="10" />
				<Rect x="10" y="740" rx="5" ry="5" width={widthR - 20} height="10" />
				<Rect x="10" y="760" rx="5" ry="5" width={widthR - 20} height="10" />
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
