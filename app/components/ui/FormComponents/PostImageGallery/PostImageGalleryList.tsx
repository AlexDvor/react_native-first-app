import { FC } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
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
				paddingBottom: 15,
				borderBottomWidth: 1,
				borderBottomColor: COLORS.midGray,
			}}
		/>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
