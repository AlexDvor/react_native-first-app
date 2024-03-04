import { FC, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Card } from '~components/ui/ItemCard/ItemCard'
import { CardSkeleton } from '~components/ui/Skeletons/CardSkeleton'
import { useAuth } from '~hooks/useAuth'
import { UserService } from '~services/user.services'

import { ProfileAnimalProps } from '../../../../interfaces/home.navigation.types'

export const AnimalProfileScreen: FC<ProfileAnimalProps> = ({ route }) => {
	const [isOwner, setIsOwner] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()
	const animalData = route.params.item
	const currAnimalId = animalData.id

	useEffect(() => {
		const fetchCollection = async () => {
			if (!user?.id) return
			try {
				setIsLoading(true)
				const { user: userData } = await UserService.getUserRef(user.id)
				const isOwnerCard = userData.ownAnimals.some(
					(item: string) => item === currAnimalId
				)

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
				<CardSkeleton />
			)}
		</>
	)
}
const styles = StyleSheet.create({})
