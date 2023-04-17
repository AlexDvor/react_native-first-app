import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import { PostImageGalleryItem } from './PostImageGalleryItem'

interface PostImageGalleryListProps {
	quantityImages: any[]
}

export const PostImageGalleryList: FC<PostImageGalleryListProps> = ({
	quantityImages,
}) => {
	return (
		<>
			<View style={styles.container}>
				{quantityImages.slice(0, 5).map((item, idx) => (
					<PostImageGalleryItem key={idx} />
				))}
			</View>
			<View style={[styles.container, styles.lastItem]}>
				{quantityImages.slice(5).map((item, idx) => (
					<PostImageGalleryItem key={idx + 5} />
				))}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		columnGap: 10,
	},
	lastItem: {
		marginTop: 10,
	},
})
