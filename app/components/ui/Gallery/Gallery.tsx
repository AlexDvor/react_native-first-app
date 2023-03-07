import { IAnimalsData } from 'interfaces/animals.types'
import { FC } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { GalleryItem } from './GalleryItem'

interface IGallery {
	items: IAnimalsData[]
}

export const Gallery: FC<IGallery> = ({ items }) => {
	return (
		<SafeAreaView>
			<FlatList
				style={styles.container}
				contentContainerStyle={{
					alignItems: 'center',
					gap: 10,
					marginTop: 20,
				}}
				horizontal={false}
				numColumns={2}
				data={items}
				renderItem={({ item }) => <GalleryItem item={item} />}
				keyExtractor={(item) => String(item.id)}
				columnWrapperStyle={{
					gap: 10,
				}}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {},
})
