import Entypo from '@expo/vector-icons/Entypo'
import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { heightScreenDevice, widthScreenDevice } from '~constants/theme'

interface InputProps extends TextInputProps {
	iconType: keyof typeof Entypo.glyphMap
	size?: number
	colorIcon?: string
}

const FormInput: FC<InputProps> = ({
	value,
	placeholder,
	iconType,
	colorIcon = '#666',
	size = 20,
	...rest
}) => {
	return (
		<View style={styles.inputContainer}>
			<View style={styles.iconStyle}>
				<Entypo name={iconType} size={20} color={colorIcon} />
			</View>
			<TextInput
				value={value}
				style={styles.input}
				numberOfLines={1}
				placeholder={placeholder}
				placeholderTextColor="#666"
				{...rest}
			/>
		</View>
	)
}

export default FormInput

const styles = StyleSheet.create({
	inputContainer: {
		marginTop: 5,
		marginBottom: 10,
		width: '100%',
		height: 45,
		borderColor: '#ccc',
		borderRadius: 20,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	iconStyle: {
		padding: 10,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: '#ccc',
		borderRightWidth: 1,
		width: 50,
	},
	input: {
		padding: 10,
		flex: 1,
		fontSize: 16,
		color: '#333',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputField: {
		padding: 10,
		marginTop: 5,
		marginBottom: 10,
		width: widthScreenDevice / 1.5,
		height: heightScreenDevice / 15,
		fontSize: 16,
		borderRadius: 8,
		borderWidth: 1,
	},
})
