import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { widthScreenDevice } from '~constants/theme'

interface FormButtonProps {
	buttonTitle: string
}

const FormButton: FC<FormButtonProps> = ({ buttonTitle, ...rest }) => {
	return (
		<TouchableOpacity style={styles.buttonContainer} {...rest}>
			<Text style={styles.buttonText}>{buttonTitle}</Text>
		</TouchableOpacity>
	)
}

export default FormButton

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 10,
		width: '100%',
		height: 60,
		backgroundColor: '#2e64e5',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ffffff',
		// fontFamily: 'Lato-Regular',
	},
})
