import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Unsubscribe } from 'firebase/auth'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Image, StatusBar, StyleSheet, View } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { Spinner } from '~components/ui/Spinner/Spinner'
import { useAuth } from '~hooks/useAuth'
import { ChatProps } from '~interfaces/message.navigation.types'
import { IChatScreenMessage } from '~interfaces/message.types'
import { ChatService } from '~services/chat.services'

export const ChatScreen: FC<ChatProps> = ({ route }) => {
	const [unsubscribe, setUnsubscribe] = useState<Promise<Unsubscribe> | null>(
		null
	)
	const [messages, setMessages] = useState<IChatScreenMessage[]>([])
	const { user } = useAuth()

	const navigation = useNavigation()
	const chatId = route.params.chatId

	useEffect(() => {
		const unsubscribeFocus = navigation.addListener('focus', () => {
			const fetchChatMessages = async () => {
				try {
					const fetchedMessages = await ChatService.getChatMessages(chatId)
					setMessages(fetchedMessages)
					const unsubscribeFromMessages = ChatService.subscribeToChatMessages(
						chatId,
						(updatedMessages) => {
							setMessages(updatedMessages)
						}
					)
					setUnsubscribe(Promise.resolve(unsubscribeFromMessages))
				} catch (error) {
					console.error('Error fetching chat messages:', error)
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
		if (newMessages.length === 0 || !user?.id) return

		try {
			setMessages((prevMessages) =>
				GiftedChat.append(prevMessages, newMessages)
			)

			const { text: messageText, user: senderData } = newMessages[0]

			await ChatService.saveMessageToChat(
				chatId,
				{ text: messageText, sender: senderData._id },
				user?.id,
				user.avatar || ''
			)
		} catch (error) {
			console.log(error)
		}
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
						backgroundColor: '#F2968F',
					},
					left: {
						backgroundColor: '#cfcecc',
					},
				}}
				textStyle={{
					right: {
						color: '#fff',
					},
					left: {
						color: '#000',
					},
				}}
				timeTextStyle={{
					right: {
						color: '#f2f2f2',
					},
					left: {
						color: '#7d7c7c',
					},
				}}
			/>
		)
	}

	const scrollToBottomComponent = () => {
		return <AntDesign name="down" size={22} color={'#333'} style={{}} />
	}

	const renderAvatar = (props: any) => {
		const { currentMessage } = props

		if (currentMessage.user.avatar) {
			return (
				<Image
					source={{ uri: currentMessage.user.avatar }}
					style={{ width: 40, height: 40, borderRadius: 20 }}
				/>
			)
		}

		return (
			<Image
				source={require('../../../../assets/images/default_user.png')}
				style={{ width: 40, height: 40, borderRadius: 20 }}
			/>
		)
	}

	return (
		<View style={styles.container}>
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
				renderAvatar={renderAvatar}
				showAvatarForEveryMessage={true}
				renderLoading={() => <Spinner />}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
	},
})
