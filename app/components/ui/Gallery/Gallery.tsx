import { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { IAnimalsData } from '~interfaces/animals.types'
import { THomeScreenName } from '~interfaces/home.navigation.types'

import { Spinner } from '../Spinner/Spinner'

import { GalleryItem } from './GalleryItem'

interface IGallery {
	items: IAnimalsData[]
	navigateTo: THomeScreenName
	favoriteListId?: string[] | null
	isLoading: boolean
}

//add in last elements a marginBottom

export const Gallery: FC<IGallery> = ({
	items,
	navigateTo,
	favoriteListId,
	isLoading,
}) => {
	return (
		<View style={styles.container}>
			{isLoading ? (
				<Spinner />
			) : (
				<FlatList
					contentContainerStyle={{
						alignItems: 'flex-start',
						gap: 10,
					}}
					horizontal={false}
					numColumns={2}
					data={items}
					renderItem={({ item, index }) => {
						const lastElem = items.slice(-2)
						const idsElem = lastElem.map((item) => item.id)
						const isFavoriteItem = favoriteListId?.some((id) => id === item.id)
						return (
							<GalleryItem
								item={item}
								lastIdElements={idsElem}
								navigateTo={navigateTo}
								isFavorite={isFavoriteItem}
							/>
						)
					}}
					keyExtractor={(item) => String(item.id)}
					columnWrapperStyle={{
						gap: 10,
					}}
					onEndReached={() => console.log('end')}
					onEndReachedThreshold={0.2}
					ListFooterComponent={null}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
	},
})
