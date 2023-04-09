import { FC } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import { PostImageGalleryList } from '~components/ui/FormComponents/PostImageGallery/PostImageGalleryList'

export const AddPostScreen: FC = () => {
	const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	return (
		<View style={styles.container}>
			<PostImageGalleryList quantityImages={quantity} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 10,
		borderWidth: 1,
		borderColor: 'red',
		marginHorizontal: 20,
	},
})
