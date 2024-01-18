import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { FC, useCallback, useState } from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { CONTAINER } from '~constants/theme'
import { TGetDistance, getTimeDistance } from '~helper/number/getTimeDistance'
import { truncateString } from '~helper/string/truncateString'
import { useAuth } from '~hooks/useAuth'
import { TNavigationComponent } from '~interfaces/home.navigation.types'
import { TNotification } from '~interfaces/notification'
import { NotificationService } from '~services/notification.services'

export const NotificationScreen: FC = () => {
	const { user } = useAuth()
	const [notificationData, setNotificationData] = useState<TNotification[]>([])

	const { navigate } = useNavigation<TNavigationComponent>()

	useFocusEffect(
		useCallback(() => {
			const fetchCollection = async () => {
				if (!user?.id) return
				try {
					const response = await NotificationService.getNotifications(user.id)

					if (response) {
						setNotificationData(response)
					} else {
						setNotificationData([])
					}
				} catch (error) {
				} finally {
				}
			}
			fetchCollection()
		}, [])
	)

	const markAsRead = (id: string) => {
		const updatedData = notificationData.map((item: TNotification) =>
			item.id === id ? { ...item, read: true } : item
		)
		setNotificationData(updatedData)
	}

	const renderNotificationMessage = ({ item }: { item: TNotification }) => {
		const { message, sendDate, read, type, confirmInfo } = item
		const getReceivedTime = getTimeDistance(sendDate as TGetDistance)

		const hasMarkedNotify = () => {
			if (type === 'offer') {
				const markOffer =
					type === 'offer' &&
					confirmInfo.confirmed === null &&
					confirmInfo.reject === null
				return markOffer
			}

			if (type === 'notification') {
				return !read
			}

			return false
		}

		return (
			<TouchableOpacity
				style={[
					styles.wrapperNotification,
					hasMarkedNotify() && styles.readNotification,
				]}
				onPress={() => navigate('NotificationItemScreen', { message: item })}
			>
				<View style={styles.titleBlock}>
					<Text style={styles.titleMessage}>{message.title}</Text>
					<Text style={styles.titleDate}>{getReceivedTime}</Text>
				</View>
				<Text>{truncateString(message.text, 100)}</Text>
			</TouchableOpacity>
		)
	}

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.titleScreen}>Notification</Text>

				<View>
					<FlatList
						data={notificationData}
						renderItem={renderNotificationMessage}
						keyExtractor={(item) => String(item.id)}
					></FlatList>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		...CONTAINER.mainContainer,
	},

	titleScreen: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 10,
	},

	wrapperNotification: {
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 10,
		marginBottom: 16,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
	},

	titleBlock: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},

	titleMessage: {
		fontSize: 17,
		fontWeight: '600',
	},

	titleDate: {
		color: 'gray',
	},

	messageText: {
		fontSize: 15,
	},
	readNotification: {
		borderLeftWidth: 6,
		borderLeftColor: '#de4f43',
	},
})
