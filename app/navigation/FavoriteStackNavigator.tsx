import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { FavoriteScreen } from '~components/screens/MainScreen/FavoriteScreen'
import { AnimalProfileScreen } from '~components/screens/MainScreen/NestedScreen/AnimalProfileScreen'
import { FavoriteRootStackParamList } from '~interfaces/favorite.navigation.types'

const FavoriteStack = createStackNavigator<FavoriteRootStackParamList>()

export const FavoriteStackNavigator: FC = () => {
	const { Navigator, Screen } = FavoriteStack
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen
				name="FavoriteScreen"
				component={FavoriteScreen}
				options={{ title: 'Favorites', headerShown: true }}
			></Screen>
			<Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
			></Screen>
		</Navigator>
	)
}
