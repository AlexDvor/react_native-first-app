import { IAnimalsData } from 'interfaces/animals.types'
import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface IGalleryItemProps {
	item: IAnimalsData
}

export const GalleryItem: FC<IGalleryItemProps> = ({
	item: { name, age, imageUrl },
}) => {
	return (
		<>
			<View style={[styles.container, styles.shadow]}>
				<View style={styles.imageWrapper}>
					<Image
						style={styles.image}
						source={require('../../../assets/images/animals/test_4.png')}
					></Image>
				</View>
				<Text style={styles.title}>{name}</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 16,
		width: 180,
		height: 192,
		overflow: 'hidden',
	},

	imageWrapper: {},

	image: {
		width: '100%',
		height: 116,
		borderRadius: 16,
	},
	title: {
		fontSize: 32,
	},

	shadow: {
		shadowColor: '#52006A',
		elevation: 1,
	},
})
