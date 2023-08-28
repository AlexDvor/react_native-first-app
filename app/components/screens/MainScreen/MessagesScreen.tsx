import { useNavigation } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { MessageItem } from '~components/ui/MessageItem/MessageItem'
import { CONTAINER } from '~constants/theme'
import { messages } from '~data/messages'
import { useAuth } from '~hooks/useAuth'
import { UserService } from '~services/user/user.services'

import { MessageNavigationComponent } from '../../../interfaces/message.navigation.types'

export const MessagesScreen: FC = () => {
	const [chats, setChats] = useState<any[]>([])
	console.log('❌ ~ chats:', chats)
	const { user } = useAuth()
	const { navigate } = useNavigation<MessageNavigationComponent>()
	const handlePress = (id: string) => navigate('ChatScreen', { user: id })

	useEffect(() => {
		const fetchChatData = async () => {
			try {
				const userId = user?.id
				if (!userId) return
				const chatIdList = await UserService.getChatIdList(userId)

				const chatList = await Promise.all(
					chatIdList.map(async (chatId: string) => {
						const messages = await UserService.getChatMessages(chatId)
						return {
							id: chatId,
							messages: messages,
						}
					})
				)

				setChats(chatList)
				console.log(chats)
			} catch (error) {
				console.error('Error fetching chat ids:', error)
			}
		}

		fetchChatData()
	}, [user?.id])

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.titleScreen}>Messages</Text>
				<FlatList
					data={[]}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<MessageItem user={item} handleOnPress={handlePress} />
					)}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		...CONTAINER.mainContainer,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	titleScreen: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingVertical: 5,
	},

	text: {
		color: 'red',
		fontSize: 25,
	},
})
