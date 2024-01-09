import { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IMessageList } from '~interfaces/message.types'

interface MessageItemProps {
	user: IMessageList
	handleOnPress: (arg: string) => void
}

export const MessageItem: FC<MessageItemProps> = ({ user, handleOnPress }) => {
	const { id, messageText, messageTime, userImg, userName } = user

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => handleOnPress(id)}
		>
			<View style={styles.userInfo}>
				<View style={styles.userImageWrapper}>
					{userImg ? (
						<Image style={styles.userImage} source={{ uri: userImg }} />
					) : (
						<Image
							style={styles.userImage}
							source={require('../../../assets/images/default_user.png')}
						/>
					)}
				</View>

				<View style={styles.textSection}>
					<View style={styles.userInfoText}>
						<Text style={styles.userName}>{userName}</Text>
						<Text style={styles.postTime}>{messageTime}</Text>
					</View>

					<Text style={styles.messageText}>{messageText}</Text>
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
