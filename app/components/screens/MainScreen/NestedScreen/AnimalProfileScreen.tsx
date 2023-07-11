import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Card } from '~components/ui/ItemCard/ItemCard'
import { useAuth } from '~hooks/useAuth'
import { UserService } from '~services/user/user.services'

import { ProfileAnimalProps } from '../../../../interfaces/home.navigation.types'

export const AnimalProfileScreen: FC<ProfileAnimalProps> = ({ route }) => {
	const [isOwner, setIsOwner] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()
	const animalData = route.params.item
	const currentId = animalData.id

	useEffect(() => {
		const fetchCollection = async () => {
			if (!user?.id) return
			try {
				setIsLoading(true)
				const idList = await UserService.getOwnIdList(user.id)
				const isOwnerCard = idList.some((item: string) => item === currentId)

				if (isOwnerCard) {
					setIsOwner(true)
				} else {
					setIsLoading(false)
				}
			} catch (error) {
				console.log('❌ ~ error:', error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchCollection()
	}, [])

	return (
		<>
			{!isLoading ? (
				<Card item={animalData} isOwnerCard={isOwner} />
			) : (
				<Text>...Loading</Text>
			)}
		</>
	)
}
const styles = StyleSheet.create({})
