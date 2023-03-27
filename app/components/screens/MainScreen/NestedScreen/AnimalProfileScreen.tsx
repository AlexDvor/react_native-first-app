import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Card } from '~components/ui/ItemCard/ItemCard'

import { ProfileAnimalProps } from '../../../../interfaces/home.navigation.types'

export const AnimalProfileScreen: FC<ProfileAnimalProps> = ({ route }) => {
	const animalData = route.params.item

	return (
		<>
			<Card item={animalData} />
		</>
	)
}
const styles = StyleSheet.create({})
