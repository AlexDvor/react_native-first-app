import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
import { CONTAINER } from '~constants/theme'
import { dataAnimals } from '~data/animals'

export const FavoriteScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Gallery
				items={dataAnimals.slice(0, 5)}
				navigateTo="AnimalProfileScreen"
			/>
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
