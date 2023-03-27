import Ionicons from '@expo/vector-icons/Fontisto'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'

import { ChatProps } from '../messageNavigation.types'

// Fix message and onSend types
//

const messageData = [
	{
		_id: 1,
		text: 'Hello developer',
		createdAt: new Date(),
		user: {
			_id: 2,
			name: 'React Native',
			avatar: 'https://placeimg.com/140/140/any',
		},
	},
	{
		_id: 2,
		text: 'Hello world',
		createdAt: new Date(),
		user: {
			_id: 1,
			name: 'React Native',
			avatar: 'https://placeimg.com/140/140/any',
		},
	},
]

// interface TChatState {
// 	_id: number
// 	text: string
// 	createdAt: {}
// 	user: {
// 		_id: number
// 		name: string
// 		avatar: string
// 	}
// }

export const ChatScreen: FC<ChatProps> = ({ route }) => {
	// const userData = route.params.user
	const [messages, setMessages] = useState<any[]>([])
	useEffect(() => setMessages(messageData), [])

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
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
		return (
			<Ionicons
				name="heart-alt"
				size={22}
				color={'#333'}
				style={{ marginBottom: 5, marginRight: 5 }}
			/>
		)
	}

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages: any) => onSend(messages)}
			user={{
				_id: 1,
			}}
			renderBubble={renderBubble}
			alwaysShowSend
			renderSend={renderSend}
			scrollToBottom
			scrollToBottomComponent={scrollToBottomComponent}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
