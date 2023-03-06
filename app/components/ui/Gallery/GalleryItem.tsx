import { IAnimalsData } from 'interfaces/animals.types'
import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface IGalleryItemProps {
	item: IAnimalsData
}

export const GalleryItem: FC<IGalleryItemProps> = ({ item: { name, age } }) => {
	return (
		<>
			<View style={styles.item}>
				<Text style={styles.title}>{name}</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
})
