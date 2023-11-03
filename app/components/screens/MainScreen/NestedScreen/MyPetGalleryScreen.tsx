import { useNavigation } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
import { Spinner } from '~components/ui/Spinner/Spinner'
import { CONTAINER } from '~constants/theme'
import { useAuth } from '~hooks/useAuth'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

export const MyPetGalleryScreen: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [petList, setPetList] = useState<IAnimalsData[]>([])
	const { user } = useAuth()
	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			const fetchCollection = async () => {
				try {
					if (!user?.id) return
					setIsLoading(true)
					const response = await UserService.getOwnAnimalColl(user.id)
					setPetList(response as IAnimalsData[])
				} catch (error) {
					setPetList([])
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
			{isLoading ? <Spinner /> : null}
			{petList?.length > 0 && !isLoading && (
				<Gallery
					items={petList}
					navigateTo="AnimalProfileScreen"
					hasPagination={false}
				/>
			)}
			{petList?.length === 0 && !isLoading && (
				<View style={styles.messageContainer}>
					<Text style={styles.message}>You don't have your own animals</Text>
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
