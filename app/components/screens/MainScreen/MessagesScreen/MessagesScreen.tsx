import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import { MessageItem } from '~components/ui/MessageItem/MessageItem'
import { messages } from '~data/messages'
import { TMessage } from '~interfaces/message.types'

import { MessageNavigationComponent } from './messageNavigation.types'

export const MessagesScreen: FC = () => {
	const { navigate } = useNavigation<MessageNavigationComponent>()
	const handlePress = (id: TMessage) => navigate('ChatScreen', { user: id })

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.titleScreen}>Messages</Text>
				<FlatList
					data={messages}
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
	titleScreen: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 10,
	},

	text: {
		color: 'red',
		fontSize: 25,
	},
})
