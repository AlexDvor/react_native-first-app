import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { FC } from 'react'
import { AnimalProfileScreen } from '~components/screens/MainScreen/NestedScreen/AnimalProfileScreen'
import { MyPetGalleryScreen } from '~components/screens/MainScreen/NestedScreen/MyPetGalleryScreen'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen'
import { COLORS } from '~constants/theme'
import { IAnimalsData } from '~interfaces/animals.types'

export type ProfileRootStackParamList = {
	ProfileScreen: undefined
	MyPetGalleryScreen: undefined
	AnimalProfileScreen: { item: IAnimalsData }
}

export type ProfileNavigationComponent =
	StackNavigationProp<ProfileRootStackParamList>

const ProfileStack = createStackNavigator<ProfileRootStackParamList>()

export const ProfileStackNavigator: FC = () => {
	const { Navigator, Screen } = ProfileStack
	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="ProfileScreen"
		>
			<Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					cardStyle: {
						backgroundColor: COLORS.screenBackgroundColor,
					},
					headerStyle: {
						backgroundColor: COLORS.screenHeaderBackgroundColor,
					},
				}}
			></Screen>
			<Screen
				name="MyPetGalleryScreen"
				component={MyPetGalleryScreen}
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
