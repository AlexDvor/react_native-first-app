import { FC, useRef } from 'react'
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { COLORS } from '~constants/theme'
import { widthScreenDevice } from '~constants/theme'
import { IAnimalsData } from '~interfaces/animals.types'

import { FavoriteIcon } from '../FavoriteIcon/FavoriteIcon'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import { ReadMoreContainer } from '../ReadMoreContainer/ReadMoreContainer'
import { Slider } from '../Slider/Slider'

interface IAnimalProfileCard {
	item: IAnimalsData
}

export const Card: FC<IAnimalProfileCard> = ({ item }) => {
	const scrollCurrentRef = useRef(null)

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<ScrollView ref={scrollCurrentRef} style={{}}>
				<Slider imageData={item.imageUri} />
				<View style={styles.infoWrapper}>
					<Text style={styles.breed}>{item.breed}</Text>
					<Text style={styles.type}>{item.type}</Text>
					<View style={styles.featureWrapper}>
						<View style={[styles.featureItem, styles.ageBackColor]}>
							<Text>Age</Text>
							<Text style={styles.featureValue}>{item.age}</Text>
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
							<Image
								style={{ width: '100%', height: 50 }}
								source={require('../../../assets/images/owner.jpg')}
							></Image>
						</View>
						<View style={styles.ownerContainer}>
							<Text style={styles.ownerName}>Kate</Text>
							<Text>Owner</Text>
						</View>

						<Text style={{ marginLeft: 'auto' }}>2.0km</Text>
					</View>

					<ReadMoreContainer
						textStyle={styles.review}
						numberOfLines={3}
						text={item.description}
						scrollRef={scrollCurrentRef}
					/>
				</View>
			</ScrollView>

			<View style={styles.buttonsWrapper}>
				<FavoriteIcon />
				<PrimaryButton
					title="Adopt Now"
					widthButton={300}
					backgroundColorButton={'secondaryBtn'}
				></PrimaryButton>
			</View>
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
	type: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 15,
		lineHeight: 16,
		marginBottom: 15,
	},

	featureWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
		marginBottom: 20,
	},

	featureItem: {
		backgroundColor: 'rgba(245, 150, 143, 0.20)',
		borderRadius: 20,
		width: widthScreenDevice / 4 - 15,
		height: 70,
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
	},

	ownerImageWrapper: {
		width: 50,
		height: 50,
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
