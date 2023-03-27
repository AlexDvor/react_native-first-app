import { AntDesign, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '~components/ui/PrimaryButton/PrimaryButton'
import { widthScreenDevice } from '~constants/theme'

export const ProfileScreen: FC = () => {
	const sizeIcon = 32
	const colorIcon = 'black'
	return (
		<>
			<View style={styles.header}>
				<LinearGradient
					start={{ x: 0.4, y: 0.0 }}
					colors={['rgba(242, 150, 143,1)', 'rgba(242, 150, 143,0.3)']}
					style={styles.backgroundHeader}
				>
					<Text style={styles.ownerName}>Kate Lopez</Text>
					<View style={styles.imageWrapper}>
						<Image
							style={{ width: '100%', height: '100%' }}
							source={require('../../../assets/images/owner.jpg')}
						></Image>
					</View>
				</LinearGradient>
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.listWrapper}>
					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<MaterialIcons
								name="account-circle"
								size={sizeIcon}
								color={colorIcon}
							/>
						</View>

						<Text style={styles.text}>Kate Lopez</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<Entypo name="mobile" size={sizeIcon} color={colorIcon} />
						</View>

						<Text style={styles.text}>620 332 73</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<Fontisto name="email" size={sizeIcon} color={colorIcon} />
						</View>

						<Text style={styles.text}>alexmatvichuk@gmail.com</Text>
					</View>

					<View style={styles.item}>
						<View style={styles.iconWrapper}>
							<AntDesign name="eyeo" size={sizeIcon} color={colorIcon} />
						</View>

						<Text style={styles.text}>Password</Text>
					</View>
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				<PrimaryButton
					title={'Edit Profile'}
					widthButton={250}
					backgroundColorButton={'secondaryBtn'}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	header: {
		width: widthScreenDevice,

		flex: 0.3,
		alignItems: 'center',
		marginBottom: 30,
	},

	ownerName: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	backgroundHeader: {
		width: widthScreenDevice + 100,
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderBottomLeftRadius: 300,
		borderBottomRightRadius: 300,
	},

	imageWrapper: {
		position: 'relative',
		top: 25,
		borderWidth: 1,
		width: 120,
		height: 120,
		borderRadius: 100,
		overflow: 'hidden',
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
		marginLeft: 35,
		fontSize: 16,
	},

	buttonsContainer: {
		flex: 0.1,
		justifyContent: 'center',
		width: widthScreenDevice,
		alignItems: 'center',
	},
})
