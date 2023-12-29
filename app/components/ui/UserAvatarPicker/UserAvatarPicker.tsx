import * as ImagePicker from 'expo-image-picker'
import { FC, useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { defaultUserAvatar } from '~constants/icons'
import { COLORS } from '~constants/theme'
import { useAuth } from '~hooks/useAuth'
import { ImageService } from '~services/image.services'

type TUserAvatar = {
	uri: string
	id: string
}

export const UserAvatarPicker: FC = () => {
	const [itemImage, setItemImage] = useState<TUserAvatar | null>(null)
	const { user } = useAuth()

	useEffect(() => {
		if (itemImage !== null) {
			ImageService.uploadAvatarImage(itemImage)
		}
	}, [itemImage])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (result.assets !== null && !result.canceled) {
			const imageUri = result.assets[0].uri
			const selectImage = { uri: imageUri, id: user?.id || '1' }
			setItemImage(selectImage)
		}
	}

	const onHandleOnPress = () => {
		pickImage()
	}

	return (
		<TouchableOpacity style={styles.item} onPress={onHandleOnPress}>
			<Image
				source={itemImage ? { uri: itemImage.uri } : defaultUserAvatar}
				style={{ width: '100%', height: '100%' }}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	item: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderColor: COLORS.midGray,
		borderRadius: 15,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
