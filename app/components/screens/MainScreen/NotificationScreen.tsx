import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
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
import { useNotify } from '~hooks/useNotify'
import { TNavigationComponent } from '~interfaces/home.navigation.types'
import { TNotification } from '~interfaces/notification'

export const NotificationScreen: FC = () => {
	const { navigate } = useNavigation<TNavigationComponent>()
	const { notification: notificationData } = useNotify()

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
