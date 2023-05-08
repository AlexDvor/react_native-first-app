import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { FC, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '~constants/theme'
import { widthScreenDevice } from '~constants/theme'
import { TFormState } from '~interfaces/form.state.types'

interface PostImageGalleryItemProps {
	formState: React.Dispatch<React.SetStateAction<TFormState>>
	indexElement: number
}

export const PostImageGalleryItem: FC<PostImageGalleryItemProps> = ({
	indexElement,
	formState,
}) => {
	const [itemImage, setItemImage] = useState<string | null>(null)

	const pickImage = async (index: number) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (result.assets !== null && !result.canceled) {
			const imageUri = result.assets[0].uri
			const selectImage = { uri: imageUri, id: index }
			setItemImage(imageUri)
			formState((prev) => ({
				...prev,
				imageUri: [...prev.imageUri, selectImage],
			}))
		}
	}

	const removeImageUri = (index: number) => {
		formState((prevState) => {
			const newImageUri = prevState.imageUri.filter(
				(item: any, i: number) => item.id !== index
			)
			return {
				...prevState,
				imageUri: newImageUri,
			}
		})
	}

	const onHandleOnPress = () => {
		if (itemImage) {
			setItemImage(null)
			removeImageUri(indexElement)
		} else {
			pickImage(indexElement)
		}
	}
	return (
		<TouchableOpacity style={styles.item} onPress={onHandleOnPress}>
			{itemImage ? (
				<Image
					source={{ uri: itemImage }}
					style={{ width: '100%', height: '100%' }}
				/>
			) : (
				<MaterialIcons
					name="add-photo-alternate"
					size={30}
					color={COLORS.midGray}
				/>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	item: {
		width: widthScreenDevice / 5 - 20,
		height: widthScreenDevice / 5 - 20,
		borderWidth: 1,
		borderColor: COLORS.midGray,
		borderRadius: 15,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
