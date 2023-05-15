import { DocumentData } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
import { CONTAINER } from '~constants/theme'
import { dataAnimals } from '~data/animals'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

export const FavoriteScreen: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [favoritesList, setFavoriteList] = useState<IAnimalsData[]>([])

	useEffect(() => {
		const fetchCollection = async () => {
			try {
				setIsLoading(true)
				const response = await UserService.getFavoriteCollection()
				setFavoriteList(response)
			} catch (error) {
				setFavoriteList([])
			} finally {
				setIsLoading(false)
			}
		}
		fetchCollection()
	}, [])

	console.log('❌ ~ favoritesList:', favoritesList)
	return (
		<View style={styles.container}>
			{isLoading && <Text>...Loading</Text>}
			{favoritesList.length > 0 && (
				<Gallery
					items={favoritesList.slice(0, 5)}
					navigateTo="AnimalProfileScreen"
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...CONTAINER.mainContainer,
		flex: 1,

		alignItems: 'center',
	},
})
