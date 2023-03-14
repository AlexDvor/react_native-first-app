import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { ItemCard } from '~components/ui/ItemCard/ItemCard'
import { ProfileAnimalProps } from '~interfaces/navigator.types'

export const AnimalProfileScreen: FC<ProfileAnimalProps> = ({ route }) => {
	const idItem = route.params

	return <ItemCard />
}
const styles = StyleSheet.create({})
