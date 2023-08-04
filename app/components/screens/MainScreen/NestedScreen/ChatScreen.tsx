import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { ChatProps } from '~interfaces/message.navigation.types'

// Fix message and onSend types
//

// const messageData = [
// 	{
// 		_id: 1,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 2,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 3,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 4,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 5,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 6,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 7,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 8,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 9,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 10,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 11,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 12,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 13,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 14,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 15,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 16,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 17,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 18,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 19,
// 		text: 'My message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 1,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// 	{
// 		_id: 20,
// 		text: 'Your message',
// 		createdAt: new Date(),
// 		user: {
// 			_id: 2,
// 			name: 'React Native',
// 			avatar: 'https://placeimg.com/140/140/any',
// 		},
// 	},
// ]

export const ChatScreen: FC<ChatProps> = ({ route }) => {
	// const userData = route.params.user
	const [messages, setMessages] = useState<any[]>([])
	useEffect(() => setMessages([]), [])

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
		return <AntDesign name="down" size={22} color={'#333'} style={{}} />
	}

	return (
		<View style={styles.container}>
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
	},
})
