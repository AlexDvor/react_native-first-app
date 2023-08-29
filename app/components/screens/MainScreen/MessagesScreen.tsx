import { useNavigation } from '@react-navigation/native'
import { formatDistanceToNow } from 'date-fns'
import { FC, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import uuid from 'react-native-uuid'
import { MessageItem } from '~components/ui/MessageItem/MessageItem'
import { Spinner } from '~components/ui/Spinner/Spinner'
import { CONTAINER } from '~constants/theme'
import { messages } from '~data/messages'
import { useAuth } from '~hooks/useAuth'
import { IMessageList } from '~interfaces/message.types'
import { UserService } from '~services/user/user.services'

import { MessageNavigationComponent } from '../../../interfaces/message.navigation.types'

export const MessagesScreen: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [chats, setChats] = useState<IMessageList[]>([])
	const { user } = useAuth()
	const navigation = useNavigation<MessageNavigationComponent>()

	const handlePress = (id: string) =>
		navigation.navigate('ChatScreen', { chatId: id })

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			const fetchChatData = async () => {
				try {
					setIsLoading(true)
					const userId = user?.id
					if (!userId) return
					const chatIdList = await UserService.getChatIdList(userId)

					const chatList = await Promise.all(
						chatIdList.map(async (chatId: string) => {
							const messages = await UserService.getChatMessages(chatId)
							console.log('❌ ~ messages:', messages)
							const firstMessage = messages[0]

							const messageTimeDistance = formatDistanceToNow(
								new Date(firstMessage.createdAt),
								{ addSuffix: false }
							)

							return {
								id: chatId,
								messageText: messages[messages.length - 1].text,
								messageTime: messageTimeDistance,
								userImg: '',
								userName: 'test',
							}
						})
					)

					setChats(chatList)
				} catch (error) {
					setChats([])
					console.error('Error fetching chat ids:', error)
				} finally {
					setIsLoading(false)
				}
			}
			fetchChatData()
		})
		return unsubscribe
	}, [navigation])

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.titleScreen}>Messages</Text>
				{!isLoading ? (
					<FlatList
						data={chats}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<MessageItem user={item} handleOnPress={handlePress} />
						)}
					/>
				) : (
					<Spinner />
				)}
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
