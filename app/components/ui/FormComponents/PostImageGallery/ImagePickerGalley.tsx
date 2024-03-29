import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { TFormState } from '~interfaces/form.state.types'

import { ImagePickerItem } from './ImagePickerItem'

interface ImagePickerGalleyProps {
	formState: React.Dispatch<React.SetStateAction<TFormState>>
	resetPicker: boolean
	setResetPicker: React.Dispatch<React.SetStateAction<boolean>>
}

export const ImagePickerGalley: FC<ImagePickerGalleyProps> = ({
	formState,
	resetPicker,
	setResetPicker,
}) => {
	const quantityImg = 10
	const dataDefaultImg = new Array(quantityImg).fill(0)
	return (
		<>
			<View style={styles.container}>
				{dataDefaultImg.slice(0, 5).map((_, index) => (
					<ImagePickerItem
						key={index}
						formState={formState}
						indexElement={index}
						resetPicker={resetPicker}
						setResetPicker={setResetPicker}
					/>
				))}
			</View>
			<View style={[styles.container, styles.lastItem]}>
				{dataDefaultImg.slice(5).map((_, index) => (
					<ImagePickerItem
						key={index + 5}
						indexElement={index + 5}
						formState={formState}
						resetPicker={resetPicker}
						setResetPicker={setResetPicker}
					/>
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
