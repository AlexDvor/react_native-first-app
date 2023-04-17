import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS } from '~constants/theme'
import { TFormState } from '~interfaces/form.state.types'

interface PostDescriptionFieldProps {
	formState: React.Dispatch<React.SetStateAction<TFormState>>
	placeholderText: string
	nameInput: string
	maxLengthInput?: number
}

export const PostDescriptionField: FC<PostDescriptionFieldProps> = ({
	placeholderText,
	formState,
	nameInput,
	maxLengthInput = 20,
}) => {
	const [text, setText] = useState('')

	const characterCount = text.length

	const onHandleChangeText = (text: string) => {
		setText(text)
	}
	return (
		<View style={styles.wrapper}>
			<Text
				style={styles.textIndicator}
			>{`${characterCount}/${maxLengthInput}`}</Text>
			<TextInput
				editable
				multiline
				inputMode="text"
				style={styles.input}
				placeholder={placeholderText}
				maxLength={maxLengthInput}
				numberOfLines={4}
				onChangeText={(value) => {
					formState((prev) => ({ ...prev, [nameInput]: value }))
					onHandleChangeText(value)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.midGray,
		marginBottom: 15,
		padding: 10,
		height: 150,
		overflow: 'hidden',
	},
	textIndicator: {
		fontSize: 12,
		textAlign: 'right',
		color: COLORS.midGray,
	},
	input: {
		height: '100%',
		paddingBottom: 10,
	},
})
