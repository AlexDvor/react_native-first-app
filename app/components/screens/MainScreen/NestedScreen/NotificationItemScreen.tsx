import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '~components/ui/PrimaryButton/PrimaryButton'
import { TGetDistance, getTimeDistance } from '~helper/number/getTimeDistance'
import { useAuth } from '~hooks/useAuth'
import { NotificationItemProps } from '~interfaces/home.navigation.types'
import { NotificationService } from '~services/user/notification.services'

type TButtons = 'Accept' | 'Reject'

export const NotificationItemScreen: FC<NotificationItemProps> = ({
	route,
}) => {
	const { message } = route.params
	const [isRead, setIsRead] = useState<boolean>(message.read)
	const { user } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [isBlockedBtn, setIsBlockedBtn] = useState(false)

	const notifyId = message.id
	const senderId = message.senderReceiverInfo.senderId
	const receiverId = message.senderReceiverInfo.receiverId

	useEffect(() => {
		if (isRead) return

		const markAsReadMessage = async () => {
			if (!user?.id) return
			try {
				await NotificationService.markNotificationAsRead(message.id, user?.id)
			} catch (error) {
				console.log('❌ ~ markAsReadMessage:', error)
			}
		}
		markAsReadMessage()
	}, [isRead])

	const handleAcceptBtn = async () => {
		if (!user?.id) return

		try {
			setIsLoading(true)
			await NotificationService.confirmAdoption(notifyId, {
				senderId,
				receiverId,
			})
			setIsBlockedBtn(true)
		} catch (error) {
		} finally {
			setIsLoading(false)
		}
	}

	const handleRejectBtn = async () => {
		try {
		} catch (error) {}
	}

	const checkDisabledBtn = (type: TButtons) => {
		if (type === 'Accept') {
			const isConfirmed =
				message.type === 'offer' && message.confirmInfo.confirmed
			return isConfirmed ? true : false
		}

		if (type === 'Reject') {
			const isRejected = message.type === 'offer' && message.confirmInfo.reject
			return isRejected ? true : false
		}
	}

	const confirmMsg =
		'Success! Your request has been confirmed. Thank you for your confirmation!'

	return (
		<View style={styles.container}>
			{message.confirmInfo.confirmed ? (
				<Text style={styles.title}>{confirmMsg}</Text>
			) : (
				<Text style={styles.title}>{message.message.title}</Text>
			)}
			<Text style={styles.date}>
				{getTimeDistance(message.sendDate as TGetDistance)}
			</Text>
			<Text style={styles.text}>{message.message.text}</Text>

			{message.type === 'offer' && (
				<View style={styles.buttonContainer}>
					<PrimaryButton
						title={'Accept'}
						widthButton={100}
						onPress={handleAcceptBtn}
						isFetching={isLoading}
						disabled={isLoading || checkDisabledBtn('Accept') || isBlockedBtn}
					></PrimaryButton>
					<PrimaryButton
						title={'Reject'}
						widthButton={100}
						margLeft={10}
						onPress={handleRejectBtn}
						disabled={isLoading || checkDisabledBtn('Reject') || isBlockedBtn}
					></PrimaryButton>
				</View>
			)}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f9f9f9',
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 15,
		textAlign: 'center',
		color: '#333',
	},
	date: {
		fontSize: 16,
		color: '#888',
		marginBottom: 15,
	},
	text: {
		fontSize: 18,
		color: '#555',
		lineHeight: 24,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		marginTop: 15,
	},
})
