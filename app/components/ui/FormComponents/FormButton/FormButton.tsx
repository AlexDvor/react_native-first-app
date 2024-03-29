import { FC } from 'react'
import { ButtonProps, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Loader } from '~components/ui/Loader/Loader'
import { COLORS } from '~constants/theme'
import { TypeColorComponents } from '~interfaces/theme.types'

interface FormButtonProps extends ButtonProps {
	backgroundColorButton?: TypeColorComponents
	isFetching: boolean
}

const FormButton: FC<FormButtonProps> = ({
	title,
	backgroundColorButton = 'primaryBtn',
	disabled,
	isFetching = false,
	...rest
}) => {
	const selectedColor = COLORS[backgroundColorButton]
	return (
		<TouchableOpacity
			disabled={disabled || isFetching}
			style={{
				marginTop: 10,
				width: '100%',
				height: 45,
				backgroundColor: disabled ? COLORS.disableBackgroundBtn : selectedColor,
				padding: 10,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 20,
			}}
			{...rest}
		>
			{isFetching ? (
				<Loader />
			) : (
				<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	)
}

export default FormButton

const styles = StyleSheet.create({})
