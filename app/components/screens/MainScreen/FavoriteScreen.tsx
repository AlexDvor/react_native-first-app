import { FC } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
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
		flex: 1,
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
		marginHorizontal: 10,
		alignItems: 'center',
	},
})
