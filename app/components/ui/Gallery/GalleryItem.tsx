import { FONTS } from 'constants/theme'
import { IAnimalsData } from 'interfaces/animals.types'
import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface IGalleryItemProps {
	item: IAnimalsData
}

export const GalleryItem: FC<IGalleryItemProps> = ({
	item: { name, age, imageUrl, breed },
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image style={styles.image} source={imageUrl}></Image>
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
		borderWidth: 1,
		width: 187,
		height: 192,
		overflow: 'hidden',
		backgroundColor: '#FCFCFC',
	},

	imageWrapper: {
		width: '100%',
		borderRadius: 16,
		overflow: 'hidden',
	},

	image: {
		width: '100%',
		height: 116,
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
