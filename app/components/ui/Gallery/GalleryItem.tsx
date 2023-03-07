import Ionicons from '@expo/vector-icons/Ionicons'
import { FONTS } from 'constants/theme'
import { IAnimalsData } from 'interfaces/animals.types'
import { FC, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface IGalleryItemProps {
	item: IAnimalsData
}

export const GalleryItem: FC<IGalleryItemProps> = ({
	item: { name, age, imageUrl, breed },
}) => {
	const [isFavorite, setIsFavorite] = useState(true)
	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image style={styles.image} source={imageUrl}></Image>
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
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.age}>{`${age} years`}</Text>
				</View>

				<Text style={styles.breed}>{breed}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		// borderWidth: 1,
		width: 187,
		height: 192,
		overflow: 'hidden',
		backgroundColor: '#FCFCFC',
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
})
