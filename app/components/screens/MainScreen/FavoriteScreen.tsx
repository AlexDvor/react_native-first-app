import { useNavigation } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
import { GallerySkeleton } from '~components/ui/Skeletons/GallerySkeleton'
import { useAuth } from '~hooks/useAuth'
import { IAnimalsData } from '~interfaces/animals.types'
import { CollectionServices } from '~services/coll.services'

export const FavoriteScreen: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [favoritesList, setFavoriteList] = useState<IAnimalsData[]>([])
	const { user } = useAuth()
	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			const fetchCollection = async () => {
				try {
					if (!user?.id) return
					setIsLoading(true)
					const response = await CollectionServices.getFavoriteColl(user.id)
					setFavoriteList(response as IAnimalsData[])
				} catch (error) {
					setFavoriteList([])
				} finally {
					setIsLoading(false)
				}
			}
			fetchCollection()
		})

		return unsubscribe
	}, [navigation])

	return (
		<View style={styles.container}>
			{isLoading ? <GallerySkeleton /> : null}
			{favoritesList?.length > 0 && !isLoading && (
				<Gallery
					items={favoritesList}
					navigateTo="AnimalProfileScreen"
					hasPagination={false}
				/>
			)}
			{favoritesList?.length === 0 && !isLoading && (
				<View style={styles.messageContainer}>
					<Text style={styles.message}>You don't have favorite animals</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		flex: 1,
		alignItems: 'center',
	},
	messageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		textAlign: 'center',
	},
})
