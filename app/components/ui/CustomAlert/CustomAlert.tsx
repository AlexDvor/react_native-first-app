import { FC } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '~constants/theme'

interface CustomAlertProps {
	visible: boolean
	message: string
	onClose: () => void
	onConfirm: () => void
}

export const CustomAlert: FC<CustomAlertProps> = ({
	visible,
	message,
	onClose,
	onConfirm,
}) => {
	return (
		<Modal
			transparent={true}
			animationType="fade"
			visible={visible}
			onRequestClose={() => onClose()}
		>
			<View style={styles.container}>
				<View style={styles.alert}>
					<Text style={styles.messageText}>{message}</Text>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							onPress={onClose}
						>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, styles.okButton]}
							onPress={onConfirm}
						>
							<Text style={styles.buttonText}>OK</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	alert: {
		backgroundColor: '#e3e1d3',
		padding: 20,
		borderRadius: 10,
		width: '80%',
	},
	messageText: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
		color: COLORS.primaryTextColorBtn,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	button: {
		padding: 10,
		borderRadius: 5,
		width: '45%',
		alignItems: 'center',
	},
	cancelButton: {
		backgroundColor: '#ffcc5c',
	},
	okButton: {
		backgroundColor: '#ffcc5c',
	},
	buttonText: {
		color: COLORS.primaryTextColorBtn,
		fontSize: 16,
		fontWeight: 'bold',
	},
})
