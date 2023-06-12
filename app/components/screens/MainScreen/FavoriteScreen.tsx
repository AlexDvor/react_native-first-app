import { useNavigation } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
import { CONTAINER } from '~constants/theme'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

export const FavoriteScreen: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [favoritesList, setFavoriteList] = useState<IAnimalsData[]>([])
	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
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
		})

		return unsubscribe
	}, [navigation])

	return (
		<View style={styles.container}>
			{isLoading && <Text>...Loading</Text>}
			{favoritesList.length > 0 && !isLoading && (
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
