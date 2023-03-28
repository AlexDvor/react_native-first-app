import { useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import { MessageItem } from '~components/ui/MessageItem/MessageItem'
import { messages } from '~data/messages'

import { MessageNavigationComponent } from '../../../interfaces/message.navigation.types'

export const MessagesScreen: FC = () => {
	const { navigate } = useNavigation<MessageNavigationComponent>()
	const handlePress = (id: string) => navigate('ChatScreen', { user: id })

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
		paddingVertical: 5,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
	},

	text: {
		color: 'red',
		fontSize: 25,
	},
})