import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { FC } from 'react'
import { AnimalProfileScreen } from '~components/screens/MainScreen/NestedScreen/AnimalProfileScreen'
import { MyPetGalleryScreen } from '~components/screens/MainScreen/NestedScreen/MyPetGalleryScreen'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen'
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
			<Screen name="ProfileScreen" component={ProfileScreen}></Screen>
			<Screen
				name="MyPetGalleryScreen"
				component={MyPetGalleryScreen}
				options={{ headerShown: true, title: 'My Animals' }}
			></Screen>
			<Screen
				name="AnimalProfileScreen"
				component={AnimalProfileScreen}
			></Screen>
		</Navigator>
	)
}
