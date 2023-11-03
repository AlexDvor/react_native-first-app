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
import { ProfileNavigationComponent } from '~navigation/ProfileStackNavigator'

const notificationData = [
	{
		id: 1,
		title: 'Remove account',
		message:
			'JavaScript (використовуючи Visual Studio Code для розробки веб-додатків):',
		date: '10.09.23',
	},
	{
		id: 2,
		title: 'Message from TAKEE',
		message:
			'Якщо у вас є конкретні запитання або інша інформація про "Loram Impsun", будь ласка, надайте більше контексту або пояснень, і я намагатимусь надати вам корисну відповідь на основі наявних даних.',
		date: '03.05.23',
	},
	{
		id: 3,
		title: 'Well done',
		message:
			'Ось приклад використання <TouchableOpacity> для створення інтерактивного елемента в React Native:',
		date: '02.09.22',
	},
]

type TNotification = {
	id: number
	title: string
	message: string
	date: string
}
export const NotificationScreen: FC = () => {
	const { navigate } = useNavigation<ProfileNavigationComponent>()

	const renderNotificationMessage = ({ item }: { item: TNotification }) => {
		const { message, title, date } = item
		return (
			<TouchableOpacity style={styles.wrapperNotification}>
				<View style={styles.titleBlock}>
					<Text style={styles.titleMessage}>{title}</Text>
					<Text style={styles.titleDate}>{date}</Text>
				</View>
				<Text>{message}</Text>
			</TouchableOpacity>
		)
	}

	const ItemSeparator = () => <View style={styles.separator}></View>

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>Notification</Text>

				<View>
					<FlatList
						data={notificationData}
						renderItem={renderNotificationMessage}
						keyExtractor={(item) => String(item.id)}
						ItemSeparatorComponent={ItemSeparator}
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

	title: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		paddingVertical: 5,
	},

	separator: {
		marginTop: 8,
		marginBottom: 5,
		height: 1,
		backgroundColor: 'gray',
	},
	wrapperNotification: {},
	titleBlock: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	titleMessage: { fontSize: 15, fontWeight: '600' },
	titleDate: {
		color: 'gray',
	},
})
