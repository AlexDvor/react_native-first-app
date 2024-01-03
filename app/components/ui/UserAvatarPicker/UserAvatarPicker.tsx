import * as ImagePicker from 'expo-image-picker'
import { FC } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '~constants/theme'
import { useAuth } from '~hooks/useAuth'
import { useAvatarUser } from '~hooks/useAvatarUser'

export const UserAvatarPicker: FC = () => {
	const { urlAvatar, updateAvatarUser } = useAvatarUser()
	const { user } = useAuth()

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
			updateAvatarUser(selectImage)
		}
	}

	const onHandleOnPress = () => {
		pickImage()
	}

	return (
		<TouchableOpacity style={styles.item} onPress={onHandleOnPress}>
			<Image source={urlAvatar} style={{ width: '100%', height: '100%' }} />
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
