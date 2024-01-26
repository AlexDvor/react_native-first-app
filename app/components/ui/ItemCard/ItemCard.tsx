import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { FC, useRef, useState } from 'react'
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, widthScreenDevice } from '~constants/theme'
import calculateAge from '~helper/number/calculateAgeInYears'
import { isDefinedAndNotZero } from '~helper/number/isDefinedAndNotZero'
import { useAuth } from '~hooks/useAuth'
import { useLocation } from '~hooks/useLocation'
import { IAnimalsData } from '~interfaces/animals.types'
import { MessageNavigationComponent } from '~interfaces/message.navigation.types'
import { TCreateNotification } from '~interfaces/notification'
import { ChatService } from '~services/chat.services'
import { CollectionServices } from '~services/coll.services'
import { LocationService } from '~services/location.services'
import { NotificationService } from '~services/notification.services'

import { AdoptedBadge } from '../AdoptedBadge/AdoptedBadge'
import { FavoriteIcon } from '../FavoriteIcon/FavoriteIcon'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import { ReadMoreContainer } from '../ReadMoreContainer/ReadMoreContainer'
import { Slider } from '../Slider/Slider'

interface IAnimalProfileCard {
	item: IAnimalsData
	isOwnerCard: boolean
}

export const Card: FC<IAnimalProfileCard> = ({ item, isOwnerCard }) => {
	const { locationDataUser } = useLocation()
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()
	const scrollCurrentRef = useRef(null)
	const { navigate, goBack } = useNavigation<MessageNavigationComponent>()
	const sizeIcon = 18
	const dayOfBirthday = item.age.day
	const monthOfBirthday = item.age.month
	const yearOfBirthday = item.age.year

	const removeAnimalFromOwnColl = async () => {
		if (!user?.id) return
		try {
			setIsLoading(true)
			await CollectionServices.removeOwnAnimalFromProfile(item.id, user.id)
			goBack()
		} catch (error) {
		} finally {
			setIsLoading(false)
		}
	}

	const submitAdoptForm = async () => {
		if (!user) return

		const notification: TCreateNotification = {
			receiverInfo: {
				id: item.owner.id,
				name: item.owner.name,
				avatar: item.owner.avatar,
			},
			senderInfo: {
				id: user.id || '',
				avatar: user.avatar || '',
				name: user.avatar || '',
			},
			animalInfo: item,
			type: 'offer',
		}

		await NotificationService.createAndSendNotify(notification)
		try {
		} catch (error) {
			console.log('❌ ~ submitAdoptForm:', error)
		}
	}

	const handleChatPress = async () => {
		try {
			const chatAlreadyExists = await ChatService.hasChatByUserIds(
				user?.id || '',
				item.owner.id
			)

			if (!chatAlreadyExists) {
				const chatId = await ChatService.createChat(
					user?.id || '',
					item.owner.id
				)
				navigate('ChatScreen', { chatId })
			} else {
				navigate('ChatScreen', { chatId: chatAlreadyExists })
			}
		} catch (error) {}
	}

	const checkLocation = () => {
		const isCardOwnedByUser = item.owner.id === user?.id
		const ownerCoords = item.owner.location?.coords
		const currentCoords = user?.location

		if (isCardOwnedByUser && locationDataUser.address) {
			return `${locationDataUser.address?.stateDistrict}, ${locationDataUser.address?.town}`
		}

		if (isCardOwnedByUser && !locationDataUser.address) {
			return "Current User doesn't have address"
		}

		if (ownerCoords && currentCoords && !isCardOwnedByUser) {
			const hasAllCoords =
				isDefinedAndNotZero(ownerCoords.latitude) &&
				isDefinedAndNotZero(ownerCoords.longitude) &&
				isDefinedAndNotZero(currentCoords.latitude) &&
				isDefinedAndNotZero(currentCoords.longitude)

			if (hasAllCoords) {
				const distance = LocationService.calculateDistance(
					ownerCoords,
					currentCoords
				)
				return distance
			} else {
				return 'some problem with users coords'
			}
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<ScrollView ref={scrollCurrentRef} style={{}}>
				<Slider imageData={item.imageUri} />
				{item.adoptedByUser !== null && <AdoptedBadge />}

				<View style={styles.infoWrapper}>
					<Text style={styles.breed}>{item.breed}</Text>

					<View style={styles.containerLocation}>
						<Ionicons
							name="md-location-outline"
							size={sizeIcon}
							color={'#111c1e'}
							style={{ height: sizeIcon, width: sizeIcon }}
						/>
						<Text style={styles.location}>{checkLocation()}</Text>
					</View>
					<View style={styles.featureWrapper}>
						<View style={[styles.featureItem, styles.ageBackColor]}>
							<Text>Age</Text>
							<Text style={styles.featureValue}>
								{calculateAge(dayOfBirthday, monthOfBirthday, yearOfBirthday)}
							</Text>
						</View>
						<View style={[styles.featureItem, styles.genderBackColor]}>
							<Text>Gender</Text>
							<Text style={styles.featureValue}>{item.gender}</Text>
						</View>
						<View style={[styles.featureItem, styles.weightBackColor]}>
							<Text>Weight</Text>
							<Text style={styles.featureValue}>{item.weight}</Text>
						</View>
						<View style={[styles.featureItem, styles.vaccineBackColor]}>
							<Text>Vaccine</Text>
							<Text style={styles.featureValue}>
								{item.vaccine ? 'Yes' : 'No'}
							</Text>
						</View>
					</View>

					<View style={styles.ownerWrapper}>
						<View style={styles.ownerImageWrapper}>
							{item.owner.avatar ? (
								<Image
									style={{ width: '100%', height: '100%' }}
									source={{ uri: item.owner.avatar }}
								></Image>
							) : (
								<Image
									style={{ width: '100%', height: '100%' }}
									source={require('../../../assets/images/default_user.png')}
								></Image>
							)}
						</View>
						<View style={styles.ownerContainer}>
							<Text style={styles.ownerName}>{item.owner.name}</Text>
							<Text>Owner</Text>
						</View>
						<View
							style={{
								marginLeft: 'auto',
							}}
						>
							{!isOwnerCard && (
								<TouchableOpacity
									onPress={handleChatPress}
									style={{
										width: 45,
										height: 45,
										backgroundColor: '#111c1e',
										alignItems: 'center',
										justifyContent: 'center',
										borderRadius: 50,
									}}
								>
									<Feather
										name="message-circle"
										size={25}
										color={'#FCFCFC'}
										style={{
											height: 25,
											width: 25,
										}}
									/>
								</TouchableOpacity>
							)}
						</View>
					</View>

					<ReadMoreContainer
						textStyle={styles.review}
						numberOfLines={3}
						text={item.description}
						scrollRef={scrollCurrentRef}
					/>
				</View>

				<View style={styles.buttonsWrapper}>
					{isOwnerCard ? null : <FavoriteIcon itemId={item.id} />}

					{isOwnerCard ? (
						<PrimaryButton
							title="Delete Animal"
							widthButton={300}
							backgroundColorButton={'secondaryBtn'}
							onPress={removeAnimalFromOwnColl}
						></PrimaryButton>
					) : (
						<PrimaryButton
							title={item.adoptedByUser ? 'You are late' : 'Adopt Now'}
							widthButton={300}
							backgroundColorButton={'secondaryBtn'}
							onPress={submitAdoptForm}
							disabled={item.adoptedByUser ? true : false}
							disabledColor={'inactiveBtn'}
						></PrimaryButton>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	infoWrapper: {
		marginHorizontal: 15,
	},

	breed: {
		fontFamily: 'OpenSans-Bold',
		fontSize: 16,
		lineHeight: 22,
		marginBottom: 5,
	},

	containerLocation: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginBottom: 20,
	},

	location: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 14,
		lineHeight: 16,

		color: 'rgba(161, 161, 161, 1)',
		marginLeft: 5,
	},

	featureWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
		marginBottom: 22,
	},

	featureItem: {
		backgroundColor: 'rgba(245, 150, 143, 0.20)',
		borderRadius: 20,
		width: widthScreenDevice / 4 - 15,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 1,
	},

	ageBackColor: {
		backgroundColor: COLORS.ageCardContainerColor,
	},
	genderBackColor: {
		backgroundColor: COLORS.genderCardContainerColor,
	},
	weightBackColor: {
		backgroundColor: COLORS.weightCardContainerColor,
	},
	vaccineBackColor: {
		backgroundColor: COLORS.vaccineCardContainerColor,
	},

	featureValue: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 2,
	},

	review: {
		color: 'rgba(161, 161, 161, 1)',
		fontSize: 15,
		lineHeight: 21,
		marginBottom: 20,
	},

	ownerWrapper: {
		flexDirection: 'row',
		marginBottom: 20,
		alignItems: 'center',
	},

	ownerImageWrapper: {
		width: 60,
		height: 60,
		borderRadius: 50,
		overflow: 'hidden',
	},

	ownerContainer: {
		marginLeft: 8,
	},

	ownerName: {
		fontFamily: 'OpenSans-Bold',
		fontSize: 16,
		lineHeight: 20,
	},

	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 30,
		marginTop: 10,
	},
})
