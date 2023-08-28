import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { useAuth } from '~hooks/useAuth'
import { ChatProps } from '~interfaces/message.navigation.types'
import { UserService } from '~services/user/user.services'

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
	const [messages, setMessages] = useState<IMessage[]>([])
	const chatId = route.params.chatId
	console.log('❌ ~ chatId:', chatId)

	const onSend = useCallback(async (newMessages: IMessage[] = []) => {
		const newMessagesData = await Promise.all(
			newMessages.map(async (message) => {
				const messageId = await UserService.saveMessageToChat(chatId, {
					text: message.text,
					sender: message.user._id,
				})

				return {
					_id: messageId,
					text: message.text,
					sender: message.user._id,
					createdAt: new Date(),
					user: {
						_id: user?.id || '',
					},
				} as IMessage
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
	},
})
