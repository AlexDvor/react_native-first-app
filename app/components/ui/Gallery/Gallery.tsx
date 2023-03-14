import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { IAnimalsData } from '~interfaces/animals.types'
import { TScreenName } from '~interfaces/navigator.types'

import { GalleryItem } from './GalleryItem'

interface IGallery {
	items: IAnimalsData[]
	screenName: TScreenName
}

//add in last elements a marginBottom

export const Gallery: FC<IGallery> = ({ items, screenName }) => {
	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={{
					alignItems: 'center',
					gap: 10,
				}}
				horizontal={false}
				numColumns={2}
				data={items}
				renderItem={({ item, index }) => {
					const lastElem = items.slice(-2)
					const idsElem = lastElem.map((item) => item.id)
					return (
						<GalleryItem
							item={item}
							lastIdElements={idsElem}
							screenName={screenName}
						/>
					)
				}}
				keyExtractor={(item) => String(item.id)}
				columnWrapperStyle={{
					gap: 10,
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
	},
})
