import { AntDesign, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { FC, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomAlert } from '~components/ui/CustomAlert/CustomAlert'
import { PrimaryButton } from '~components/ui/PrimaryButton/PrimaryButton'
import { UserAvatarPicker } from '~components/ui/UserAvatarPicker/UserAvatarPicker'
import { widthScreenDevice } from '~constants/theme'
import { useActions } from '~hooks/useActions'
import { useAuth } from '~hooks/useAuth'
import { ProfileNavigationComponent } from '~navigation/ProfileStackNavigator'

export const ProfileScreen: FC = () => {
	const { user } = useAuth()
	const { singOut } = useActions()
	const { navigate } = useNavigation<ProfileNavigationComponent>()
	const [showLocationAlert, setShowLocationAlert] = useState(false)
	const SIZE_ICON = 32
	const COLOR_ICON = 'black'

	const handlePressLocation = () => {
		setShowLocationAlert((prev) => !prev)
		// if (user?.location) {
		// 	console.log('You have location')
		// } else {
		// 	console.log('dont have loc')
		// }
		// navigate('LocationScreen')
	}

	const handlePressMyGallery = () => {
		navigate('MyPetGalleryScreen')
	}

	return (
		<>
			<View style={styles.header}>
				<LinearGradient
					start={{ x: 0.4, y: 0.0 }}
					colors={['#ff6ba6', '#ffcc5c']}
					style={styles.backgroundHeader}
				>
					<Text style={styles.ownerName}>{user?.name}</Text>
					<View style={styles.imageWrapper}>
						<UserAvatarPicker />
					</View>
				</LinearGradient>
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.listWrapper}>
					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<MaterialIcons
								name="account-circle"
								size={SIZE_ICON}
								color={COLOR_ICON}
							/>
						</View>

						<Text style={styles.text}>{user?.name || 'Undefined'}</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<Entypo name="mobile" size={SIZE_ICON} color={COLOR_ICON} />
						</View>

						<Text style={styles.text}>{'Undefined'}</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<Fontisto name="email" size={SIZE_ICON} color={COLOR_ICON} />
						</View>

						<Text style={styles.text}>{user?.email}</Text>
					</View>

					<TouchableOpacity style={styles.item} onPress={handlePressLocation}>
						<View style={styles.iconWrapper}>
							<Entypo name="location" size={SIZE_ICON} color={COLOR_ICON} />
						</View>

						<Text style={styles.text}>Location</Text>
					</TouchableOpacity>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<AntDesign name="eyeo" size={SIZE_ICON} color={COLOR_ICON} />
						</View>

						<Text style={styles.text}>Password</Text>
					</View>

					<TouchableOpacity style={styles.item} onPress={handlePressMyGallery}>
						<View style={styles.iconWrapper}>
							<Image
								style={{ width: SIZE_ICON, height: SIZE_ICON }}
								source={require('../../../assets/icons/pet.png')}
							></Image>
						</View>

						<Text style={styles.text}>Your Animals</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				<PrimaryButton
					title={'Edit Profile'}
					widthButton={250}
					backgroundColorButton={'secondaryBtn'}
				/>
				<PrimaryButton
					title={'SignOut'}
					widthButton={250}
					backgroundColorButton={'secondaryBtn'}
					onPress={() => singOut()}
				/>
			</View>
			<CustomAlert
				visible={showLocationAlert}
				message="Do you want to update your location?"
				onClose={() => setShowLocationAlert(false)}
				onConfirm={() => {}}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	header: {
		flex: 0.3,
		alignItems: 'center',
		marginBottom: 30,
	},

	ownerName: {
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 8,
	},

	backgroundHeader: {
		width: '100%',
		aspectRatio: 2,
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderBottomLeftRadius: 300,
		borderBottomRightRadius: 300,
	},

	imageWrapper: {
		position: 'relative',
		top: 25,
		width: 120,
		height: 120,
		borderRadius: 100,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: 'white',
	},

	contentContainer: {
		flex: 0.6,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	listWrapper: {
		width: '100%',
	},

	item: {
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 15,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(88, 89, 87,0.3)',
	},

	iconWrapper: {
		marginLeft: 10,
	},

	text: {
		marginLeft: 20,
		fontSize: 16,
	},

	buttonsContainer: {
		flex: 0.2,
		justifyContent: 'center',
		width: widthScreenDevice,
		alignItems: 'center',
		gap: 10,
	},
})
