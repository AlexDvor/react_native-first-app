import Ionicons from '@expo/vector-icons/MaterialCommunityIcons'
import { FC } from 'react'
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { FONTS } from '~constants/theme'
import { IAnimalsData } from '~interfaces/animals.types'

interface IAnimalProfileCard {
	item: IAnimalsData
}

export const Card: FC<IAnimalProfileCard> = ({ item }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<View style={styles.imageWrapper}>
					<Image style={styles.image} source={item.imageUrl} />
					<View style={styles.generalInfoWrapper}>
						<View>
							<Text>{item.name}</Text>
							<Text>{`${item.breed} · 1y 4m`}</Text>
						</View>
						<View style={styles.iconGender}>
							{item.gender === 'male' ? (
								<Ionicons name="gender-male" size={32} color="white" />
							) : (
								<Ionicons name="gender-female" size={32} color="white" />
							)}
						</View>
					</View>
				</View>

				<View style={styles.infoWrapper}>
					<View style={styles.iconWrapper}>
						<Image
							style={{ width: 26, height: 26 }}
							source={require('../../../assets/icons/pet.png')}
						></Image>

						<Text style={styles.sectionTitle}>{`About ${item.name}`}</Text>
					</View>

					<View style={styles.featureWrapper}>
						<View style={styles.featureItem}>
							<Text>Weight</Text>
							<Text style={styles.featureValue}>{`${item.weight} kg`}</Text>
						</View>
						<View style={styles.featureItem}>
							<Text>Height</Text>
							<Text style={styles.featureValue}>{`${item.height} cm`}</Text>
						</View>
						<View style={styles.featureItem}>
							<Text>Color</Text>
							<Text style={styles.featureValue}>{item.color}</Text>
						</View>
					</View>
					<Text style={styles.reviewOwner}>{item.description}</Text>

					<View style={styles.iconWrapper}>
						<Image
							style={{ width: 26, height: 26 }}
							source={require('../../../assets/icons/smileys.png')}
						></Image>
						<Text style={styles.sectionTitle}>{`${item.name} behavior`}</Text>
					</View>
					{item.behavior && (
						<View style={styles.behaviorWrapper}>
							{item.behavior.map((item, index) => (
								<View style={styles.behaviorItem} key={index}>
									<Text style={styles.behaviorText}>{item}</Text>
								</View>
							))}
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	imageWrapper: {
		width: '100%',
		position: 'relative',
	},

	image: { width: '100%', height: 400 },

	generalInfoWrapper: {
		position: 'absolute',
		bottom: '-10%',
		left: '10%',
		marginHorizontal: 15,

		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 25,
		paddingHorizontal: 15,
		borderRadius: 20,
		width: 300,
		backgroundColor: 'rgba(245, 150, 143, 0.4)',
	},
	generalInfoName: {},
	generalInfoBreedAndAge: {},

	iconGender: {
		width: 40,
		height: 40,
		backgroundColor: 'rgba(245, 150, 143, 1)',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	infoWrapper: {
		marginHorizontal: 15,
		marginTop: 50,
	},

	iconWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	sectionTitle: {
		...FONTS.body1,
		marginBottom: 10,
		marginTop: 10,
		marginLeft: 6,
	},

	featureWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},

	featureItem: {
		backgroundColor: 'rgba(245, 150, 143, 0.20)',
		padding: 15,
		borderRadius: 20,
		width: 110,
		justifyContent: 'center',
		alignItems: 'center',
	},

	featureValue: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 2,
	},

	reviewOwner: {
		color: 'rgba(161, 161, 161, 1)',
		fontSize: 16,
		lineHeight: 21,
		marginBottom: 20,
	},

	behaviorWrapper: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		gap: 15,
		marginBottom: 10,
	},

	behaviorTitle: {
		...FONTS.body1,
		marginBottom: 10,
	},

	behaviorItem: {
		borderWidth: 1,
		padding: 8,
		borderRadius: 25,
		borderColor: 'rgba(245, 150, 143, 1)',
	},
	behaviorText: {
		fontSize: 16,
	},
})
