import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigationProp } from '@react-navigation/stack'
import { FC } from 'react'
import { AnimalProfileScreen } from '~components/screens/MainScreen/NestedScreen/AnimalProfileScreen'
import { LocationScreen } from '~components/screens/MainScreen/NestedScreen/LocationScreen'
import { MyPetGalleryScreen } from '~components/screens/MainScreen/NestedScreen/MyPetGalleryScreen'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen'
import { screenOptionsConf } from '~config/tabBarNavigator.config'
import { IAnimalsData } from '~interfaces/animals.types'

export type ProfileRootStackParamList = {
	ProfileScreen: undefined
	MyPetGalleryScreen: undefined
	AnimalProfileScreen: { item: IAnimalsData }
	LocationScreen: undefined
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
					...screenOptionsConf,
				}}
			></Screen>
			<Screen
				name="MyPetGalleryScreen"
				component={MyPetGalleryScreen}
				options={{
					...screenOptionsConf,
					headerShown: true,
					title: 'My Animals',
				}}
			></Screen>
			<Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
				options={{
					...screenOptionsConf,
					headerShown: true,
					title: 'My Animals',
				}}
			></Screen>
			<Screen
				name="LocationScreen"
				component={LocationScreen}
				options={{
					...screenOptionsConf,
				}}
			></Screen>
		</Navigator>
	)
}
