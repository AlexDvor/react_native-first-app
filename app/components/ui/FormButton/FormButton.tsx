import { FC } from 'react'
import { ButtonProps, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '~constants/theme'
import { TypeColorComponents } from '~interfaces/theme.types'

interface FormButtonProps extends ButtonProps {
	backgroundColorButton?: TypeColorComponents
}

const FormButton: FC<FormButtonProps> = ({
	title,
	backgroundColorButton = 'primaryBtn',
	...rest
}) => {
	const selectedColor = COLORS[backgroundColorButton]
	return (
		<TouchableOpacity
			style={{
				marginTop: 10,
				width: '100%',
				height: 45,
				backgroundColor: selectedColor,
				padding: 10,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 20,
			}}
			{...rest}
		>
			<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

export default FormButton

const styles = StyleSheet.create({})
