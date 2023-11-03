import { useNavigation } from '@react-navigation/native'
import { FC, useState } from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { CONTAINER } from '~constants/theme'
import { truncateString } from '~helper/string/truncateString'
import { ProfileNavigationComponent } from '~navigation/ProfileStackNavigator'

const data = [
	{
		id: 1,
		title: 'Remove account',
		message:
			'JavaScript (використовуючи Visual Studio Code для розробки веб-додатків):',
		date: '10.09.23',
		read: true,
	},
	{
		id: 2,
		title: 'Message from TAKEE',
		message:
			'Якщо у вас є конкретні запитання або інша інформація про "Loram Impsun", будь ласка, надайте більше контексту або пояснень, і я намагатимусь надати вам корисну відповідь на основі наявних даних.',
		date: '03.05.23',
		read: false,
	},
	{
		id: 3,
		title: 'Well done',
		message:
			'Ось приклад використання <TouchableOpacity> для створення інтерактивного елемента в React Native:',
		date: '02.09.22',
		read: false,
	},
]

type TNotification = {
	id: number
	title: string
	message: string
	date: string
	read: boolean
}
export const NotificationScreen: FC = () => {
	const [notificationData, setNotificationData] = useState(data)
	const { navigate } = useNavigation<ProfileNavigationComponent>()

	const markAsRead = (id: number) => {
		const updatedData = notificationData.map((item) =>
			item.id === id ? { ...item, read: true } : item
		)
		setNotificationData(updatedData)
	}

	const renderNotificationMessage = ({ item }: { item: TNotification }) => {
		const { message, title, date, read } = item
		return (
			<TouchableOpacity
				style={[styles.wrapperNotification, read && styles.readNotification]}
			>
				<View style={styles.titleBlock}>
					<Text style={styles.titleMessage}>{title}</Text>
					<Text style={styles.titleDate}>{date}</Text>
				</View>
				<Text>{truncateString(message, 100)}</Text>
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
		fontSize: 18,
		fontWeight: '600',
	},

	titleDate: {
		color: 'gray',
	},

	messageText: {
		fontSize: 16,
	},
	readNotification: {
		borderLeftWidth: 6,
		borderLeftColor: '#de4f43',
	},
})
