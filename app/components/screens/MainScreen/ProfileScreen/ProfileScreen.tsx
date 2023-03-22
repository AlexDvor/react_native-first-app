import { AntDesign, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '~components/ui/PrimaryButton/PrimaryButton'
import { widthScreenDevice } from '~constants/theme'

export const ProfileScreen: FC = () => {
	const sizeIcon = 32
	return (
		<>
			<View style={styles.headerWrapper}>
				<View style={styles.imageWrapper}>
					<Image
						style={{ width: '100%', height: '100%' }}
						source={require('../../../../assets/images/owner.jpg')}
					></Image>
				</View>
			</View>

			<View style={styles.container}>
				<View style={styles.listWrapper}>
					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<MaterialIcons
								name="account-circle"
								size={sizeIcon}
								color="black"
							/>
						</View>

						<Text style={styles.text}>Kate Lopez</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<AntDesign name="calendar" size={sizeIcon} color="black" />
						</View>

						<Text style={styles.text}>Data of Birthday</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<Entypo name="mobile" size={sizeIcon} color="black" />
						</View>

						<Text style={styles.text}>620 332 73</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<Fontisto name="email" size={sizeIcon} color="black" />
						</View>

						<Text style={styles.text}>alexmatvichuk@gmail.com</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<AntDesign name="eyeo" size={sizeIcon} color="black" />
						</View>

						<Text style={styles.text}>Password</Text>
					</View>
				</View>
				<View>
					<PrimaryButton
						title={'Edit Profile'}
						widthButton={250}
						backgroundColorButton={'secondaryBtn'}
					/>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		// marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 10,
		marginHorizontal: 20,
		borderWidth: 2,
		borderColor: 'red',
	},

	headerWrapper: {
		backgroundColor: 'tomato',
		width: widthScreenDevice,
		height: widthScreenDevice,
		borderRadius: 150,
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderWidth: 2,
	},

	imageWrapper: {
		width: 120,
		height: 120,
		borderRadius: 100,
		overflow: 'hidden',
	},

	listWrapper: {
		width: '100%',
	},

	item: {
		flexDirection: 'row',
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
		alignItems: 'center',
	},
	iconWrapper: {},
	text: {
		marginLeft: 30,
	},
})
