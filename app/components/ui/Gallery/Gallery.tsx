import { FC } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { COLORS } from '~constants/theme'
import { IAnimalsData } from '~interfaces/animals.types'
import { THomeScreenName } from '~interfaces/home.navigation.types'

import { Spinner } from '../Spinner/Spinner'

import { GalleryItem } from './GalleryItem'

interface IGallery {
	items: IAnimalsData[]
	navigateTo: THomeScreenName
	hasPagination: boolean
	favoriteListId?: string[] | null
	isLoading?: boolean
	onLoadMore?: () => void
	isPaginationLoading?: boolean
}

export const Gallery: FC<IGallery> = ({
	items,
	navigateTo,
	hasPagination,
	favoriteListId,
	isLoading,
	onLoadMore,
	isPaginationLoading,
}) => {
	const renderFooter = () => {
		return (
			<View style={styles.footer}>
				{isPaginationLoading ? (
					<ActivityIndicator color={COLORS.spinnerColor} />
				) : null}
			</View>
		)
	}

	const renderItem = ({ item }: { item: IAnimalsData }) => {
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
	}

	const handleLoadMore = () => {
		if (hasPagination && onLoadMore) {
			onLoadMore()
		}
	}

	return (
		<View style={styles.container}>
			{isLoading ? (
				<Spinner />
			) : (
				<FlatList
					horizontal={false}
					numColumns={2}
					data={items}
					renderItem={renderItem}
					keyExtractor={(item) => String(item.id)}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.3}
					ListFooterComponent={renderFooter}
					columnWrapperStyle={{
						gap: 10,
					}}
					contentContainerStyle={{
						alignItems: 'flex-start',
						gap: 10,
					}}
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

	footer: {
		padding: 5,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		marginBottom: 30,
	},
})
