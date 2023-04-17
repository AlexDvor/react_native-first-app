import { FC } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { COLORS } from '~constants/theme'

import { PostImageGalleryItem } from './PostImageGalleryItem'

interface PostImageGalleryListProps {
	quantityImages: any[]
}

export const PostImageGalleryList: FC<PostImageGalleryListProps> = ({
	quantityImages,
}) => {
	return (
		<FlatList
			horizontal={false}
			numColumns={5}
			data={quantityImages}
			renderItem={({ item }) => <PostImageGalleryItem />}
			keyExtractor={(item, idx) => idx.toString()}
			columnWrapperStyle={{
				gap: 12,
			}}
			contentContainerStyle={{
				gap: 12,
				paddingBottom: 20,
				borderBottomWidth: 1,
				borderBottomColor: COLORS.midGray,
				marginBottom: 15,
			}}
		/>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})