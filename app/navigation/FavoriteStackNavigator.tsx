import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { FavoriteScreen } from '~components/screens/MainScreen/FavoriteScreen'
import { AnimalProfileScreen } from '~components/screens/MainScreen/NestedScreen/AnimalProfileScreen'
import { COLORS } from '~constants/theme'
import { FavoriteRootStackParamList } from '~interfaces/favorite.navigation.types'

const FavoriteStack = createStackNavigator<FavoriteRootStackParamList>()

export const FavoriteStackNavigator: FC = () => {
	const { Navigator, Screen } = FavoriteStack
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen
				name="FavoriteScreen"
				component={FavoriteScreen}
				options={{
					title: 'Favorites',
					headerShown: true,
					cardStyle: {
						backgroundColor: COLORS.screenBackgroundColor,
					},
					headerStyle: {
						backgroundColor: COLORS.screenHeaderBackgroundColor,
					},
				}}
			></Screen>
			<Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
				options={{
					headerShown: true,
					title: 'My Animals',
					cardStyle: {
						backgroundColor: COLORS.screenBackgroundColor,
					},
					headerStyle: {
						backgroundColor: COLORS.screenHeaderBackgroundColor,
					},
				}}
			></Screen>
		</Navigator>
	)
}
