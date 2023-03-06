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
				data={items}
				horizontal
				renderItem={({ item }) => <GalleryItem item={item} />}
				keyExtractor={(item) => String(item.id)}
				showsHorizontalScrollIndicator={false}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({})
