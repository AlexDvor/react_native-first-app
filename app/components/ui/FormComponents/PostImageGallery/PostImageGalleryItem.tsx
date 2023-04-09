import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '~constants/theme'
import { widthScreenDevice } from '~constants/theme'

export const PostImageGalleryItem: FC = () => {
	return (
		<TouchableOpacity style={styles.item}>
			<MaterialIcons
				name="add-photo-alternate"
				size={30}
				color={COLORS.midGray}
			/>
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
