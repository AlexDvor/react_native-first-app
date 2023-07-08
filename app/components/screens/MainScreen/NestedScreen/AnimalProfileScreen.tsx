import { FC, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Card } from '~components/ui/ItemCard/ItemCard'
import { UserService } from '~services/user/user.services'

import { ProfileAnimalProps } from '../../../../interfaces/home.navigation.types'

export const AnimalProfileScreen: FC<ProfileAnimalProps> = ({ route }) => {
	const [isOwner, setIsOwner] = useState(false)
	const animalData = route.params.item
	const currentId = animalData.id

	useEffect(() => {
		const fetchCollection = async () => {
			const response = UserService.getOwnIdList()
			try {
			} catch (error) {
			} finally {
			}
		}
		fetchCollection()
	}, [])

	return (
		<>
			<Card item={animalData} />
		</>
	)
}
const styles = StyleSheet.create({})
