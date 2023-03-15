import { FC } from 'react'
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { COLORS } from '~constants/theme'
import { widthScreen } from '~constants/theme'
import { IAnimalsData } from '~interfaces/animals.types'

import { FavoriteIcon } from '../FavoriteIcon/FavoriteIcon'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton'
import { TextContainer } from '../TextContainer/TextContainer'

interface IAnimalProfileCard {
	item: IAnimalsData
}

export const Card: FC<IAnimalProfileCard> = ({ item }) => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<ScrollView>
				<View style={styles.imageWrapper}>
					<Image style={styles.image} source={item.imageUrl} />
				</View>

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

					<TextContainer
						textStyle={styles.reviewOwner}
						numberOfLines={3}
						text={item.description}
					/>

					<View style={styles.buttonsWrapper}>
						<FavoriteIcon />
						<PrimaryButton
							title="Adopt Now"
							widthButton={300}
							backgroundColorButton={'secondaryBtn'}
						></PrimaryButton>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	imageWrapper: {
		width: '100%',
		marginBottom: 15,
	},

	image: { width: '100%', height: 400 },

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
		width: widthScreen / 4 - 15,
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

	reviewOwner: {
		color: 'rgba(161, 161, 161, 1)',
		fontSize: 15,
		lineHeight: 21,
		marginBottom: 5,
	},

	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 30,
		marginTop: 10,
	},
})
