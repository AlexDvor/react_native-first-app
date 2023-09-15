import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Unsubscribe } from 'firebase/auth'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { Spinner } from '~components/ui/Spinner/Spinner'
import { useAuth } from '~hooks/useAuth'
import { ChatProps } from '~interfaces/message.navigation.types'
import { IChatScreenMessage } from '~interfaces/message.types'
import { IChatMessage, UserService } from '~services/user/user.services'

interface IMessage {
	_id: string
	text: string
	sender: string
	createdAt: Date
	user: {
		_id: string
	}
}

export const ChatScreen: FC<ChatProps> = ({ route }) => {
	const { user } = useAuth()
	const [messages, setMessages] = useState<IChatScreenMessage[]>([])
	const [unsubscribe, setUnsubscribe] = useState<Promise<Unsubscribe> | null>(
		null
	)

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const navigation = useNavigation()
	const chatId = route.params.chatId

	useEffect(() => {
		const unsubscribeFocus = navigation.addListener('focus', () => {
			const fetchChatMessages = async () => {
				try {
					setIsLoading(true)
					const fetchedMessages = await UserService.getChatMessages(chatId)
					setMessages(fetchedMessages)
					const unsubscribeFromMessages = UserService.subscribeToChatMessages(
						chatId,
						(updatedMessages) => {
							setMessages(updatedMessages)
						}
					)
					setUnsubscribe(Promise.resolve(unsubscribeFromMessages))
				} catch (error) {
					console.error('Error fetching chat messages:', error)
				} finally {
					setIsLoading(false)
				}
			}
			fetchChatMessages()
		})
		return () => {
			unsubscribeFocus()

			if (unsubscribe) {
				unsubscribe.then((unsubscribeFn) => unsubscribeFn())
			}
		}
	}, [navigation])

	const onSend = useCallback(async (newMessages: IChatScreenMessage[] = []) => {
		const newMessagesData = await Promise.all(
			newMessages.map(async (message) => {
				const messageId = await UserService.saveMessageToChat(
					chatId,
					{
						text: message.text,
						sender: message.user._id,
					},
					user?.id || ''
				)
				console.log('👀 ~ message:', messageId)

				return {
					_id: message._id,
					text: message.text,
					sender: message.user._id,
					createdAt: new Date(),
					user: {
						_id: message.user._id,
					},
				} as IChatScreenMessage
			})
		)
		setMessages((prevMessages) =>
			GiftedChat.append(prevMessages, newMessagesData)
		)
	}, [])

	const renderSend = (props: any) => {
		return (
			<Send {...props}>
				<View>
					<MaterialCommunityIcons
						name="send"
						size={32}
						color={'#2e64e5'}
						style={{ marginBottom: 5, marginRight: 5 }}
					/>
				</View>
			</Send>
		)
	}

	const renderBubble = (props: any) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#2e64e5',
					},
				}}
				textStyle={{
					right: {
						color: '#fff',
					},
				}}
			/>
		)
	}

	const scrollToBottomComponent = () => {
		return <AntDesign name="down" size={22} color={'#333'} style={{}} />
	}

	return (
		<View style={styles.container}>
			{!isLoading ? (
				<GiftedChat
					messages={messages}
					onSend={onSend}
					user={{
						_id: user?.id || '',
					}}
					renderBubble={renderBubble}
					alwaysShowSend
					renderSend={renderSend}
					scrollToBottom
					scrollToBottomComponent={scrollToBottomComponent}
					keyboardShouldPersistTaps="handled"
				/>
			) : (
				<Spinner />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
	},
})
