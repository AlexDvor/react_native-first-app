import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { TFormState } from '~interfaces/form.state.types'

import { PostImageGalleryItem } from './PostImageGalleryItem'

interface PostImageGalleryListProps {
	formState: React.Dispatch<React.SetStateAction<TFormState>>
}

export const PostImageGalleryList: FC<PostImageGalleryListProps> = ({
	formState,
}) => {
	const quantityImg = 10
	const dataDefaultImg = new Array(quantityImg).fill(0)
	return (
		<>
			<View style={styles.container}>
				{dataDefaultImg.slice(0, 5).map((item, index) => (
					<PostImageGalleryItem key={index} formState={formState} />
				))}
			</View>
			<View style={[styles.container, styles.lastItem]}>
				{dataDefaultImg.slice(5).map((item, index) => (
					<PostImageGalleryItem key={index} formState={formState} />
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
