import { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TMessage } from '~data/messages'

interface MessageItemProps {
	user: TMessage
	handleOnPress: () => void
}

export const MessageItem: FC<MessageItemProps> = ({ user, handleOnPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={handleOnPress}>
			<View style={styles.userInfo}>
				<View style={styles.userImageWrapper}>
					<Image style={styles.userImage} source={user.userImg} />
				</View>

				<View style={styles.textSection}>
					<View style={styles.userInfoText}>
						<Text style={styles.userName}>{user.userName}</Text>
						<Text style={styles.postTime}>{user.messageTime}</Text>
					</View>

					<Text style={styles.messageText}>{user.messageText}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},

	userInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	userImageWrapper: {
		paddingTop: 15,
		paddingBottom: 15,
	},

	userImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	textSection: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingHorizontal: 15,
		paddingVertical: 15,
		marginLeft: 10,
		width: 300,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc',
	},

	userInfoText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
	},

	userName: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	postTime: {
		fontSize: 12,
		color: '#666',
	},

	messageText: {
		fontSize: 14,
		color: '#333333',
	},
})
