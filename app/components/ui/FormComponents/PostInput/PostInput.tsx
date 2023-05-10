import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { COLORS, FONTS } from '~constants/theme'
import { TFormState } from '~interfaces/form.state.types'

interface PostInputProps extends TextInputProps {
	formState: React.Dispatch<React.SetStateAction<TFormState>>
	placeholderText: string
	nameInput: string
	maxLengthInput?: number
	value: string | undefined
}

export const PostInput: FC<PostInputProps> = ({
	placeholderText,
	formState,
	nameInput,
	maxLengthInput = 20,
	value,
	...rest
}) => {
	return (
		<View style={styles.item}>
			<TextInput
				value={value}
				style={styles.input}
				placeholder={placeholderText}
				onChangeText={(value) => {
					formState((prev) => ({ ...prev, [nameInput]: value }))
				}}
				maxLength={maxLengthInput}
				placeholderTextColor={COLORS.placeholderTextColor}
				{...rest}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.midGray,
		marginBottom: 15,
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 5,
	},

	input: {
		...FONTS.inputFont,
	},
})
