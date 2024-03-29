import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { COLORS } from '~constants/theme'

interface CustomModalProps {
	visible: boolean
	title?: string
	message: string
	onClose: () => void
	onConfirm: () => void
}

export const CustomModal: FC<CustomModalProps> = ({
	visible,
	title,
	message,
	onClose,
	onConfirm,
}) => {
	if (!visible) {
		return null
	}
	return (
		<Modal
			isVisible={visible}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropOpacity={0.5}
			onBackdropPress={onClose}
			style={styles.modal}
		>
			<View style={styles.container}>
				<View style={styles.alert}>
					{title && <Text style={styles.titleText}>{title}</Text>}
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

	titleText: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
		color: COLORS.primaryTextColorBtn,
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
	modal: {
		margin: 0,
		justifyContent: 'flex-end',
	},
})
