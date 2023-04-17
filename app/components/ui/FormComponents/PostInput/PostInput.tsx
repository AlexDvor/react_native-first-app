import { FC } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { COLORS } from '~constants/theme'

interface PostInputProps {
	formState: React.Dispatch<React.SetStateAction<{}>>
	placeholderText: string
	nameInput: string
	maxLengthInput?: number
}

export const PostInput: FC<PostInputProps> = ({
	placeholderText,
	formState,
	nameInput,
	maxLengthInput = 20,
}) => {
	return (
		<View style={styles.item}>
			<TextInput
				style={styles.input}
				placeholder={placeholderText}
				onChangeText={(value) => {
					formState((prev) => ({ ...prev, [nameInput]: value }))
				}}
				maxLength={maxLengthInput}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.midGray,
		marginBottom: 15,
		padding: 15,
	},

	input: {
		fontSize: 15,
	},
})
