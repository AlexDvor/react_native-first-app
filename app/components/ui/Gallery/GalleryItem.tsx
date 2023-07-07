import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { FC, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FONTS, widthScreenDevice } from '~constants/theme'
import calculateAge from '~helper/number/calculateAgeInYears'
import { IAnimalsData } from '~interfaces/animals.types'
import {
	THomeScreenName,
	TNavigationComponent,
} from '~interfaces/home.navigation.types'

interface IGalleryItemProps {
	item: IAnimalsData
	lastIdElements?: string[]
	navigateTo: THomeScreenName
}

export const GalleryItem: FC<IGalleryItemProps> = ({ item, navigateTo }) => {
	const [isFavorite, setIsFavorite] = useState(true)
	const { navigate } = useNavigation<TNavigationComponent>()
	const dayOfBirthday = item.age.day
	const monthOfBirthday = item.age.month
	const yearOfBirthday = item.age.year

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigate(navigateTo, { item: item })}
		>
			<View style={styles.imageWrapper}>
				<Image
					style={styles.image}
					source={{ uri: String(item.imageUri[0]) }}
				></Image>
			</View>

			<View style={styles.icon}>
				{isFavorite ? (
					<Ionicons name="star" size={13} color="white" />
				) : (
					<Ionicons name="star-outline" size={13} color="white" />
				)}
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.info}>
					<Text style={styles.name}>{`${item.name}`}</Text>
					<Text style={styles.age}>
						{`${calculateAge(
							dayOfBirthday,
							monthOfBirthday,
							yearOfBirthday
						)} years`}
					</Text>
				</View>

				<Text style={styles.breed}>{item.breed}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		width: widthScreenDevice / 2 - 20,
		height: 192,
		overflow: 'hidden',
		backgroundColor: '#FCFCFC',
		elevation: 2,
	},

	imageWrapper: {
		position: 'relative',
		width: '100%',
		borderRadius: 16,
		overflow: 'hidden',
	},

	image: {
		width: '100%',
		height: 116,
	},

	icon: {
		position: 'absolute',
		top: 5,
		right: 5,
		width: 24,
		height: 24,
		borderRadius: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		justifyContent: 'center',
		alignItems: 'center',
	},

	infoContainer: { padding: 5 },

	info: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	name: {
		...FONTS.body1,
	},
	age: {
		...FONTS.body2,
	},
	breed: {
		...FONTS.body3,
		marginTop: 5,
	},

	marginBottom: {
		marginBottom: 30,
	},
})
