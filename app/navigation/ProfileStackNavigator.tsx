import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { FC } from 'react'
import { MyPetGalleryScreen } from '~components/screens/MainScreen/MyPetGalleryScreen'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen'

type ProfileRootStackParamList = {
	ProfileScreen: undefined
	MyPetGalleryScreen: undefined
}

export type ProfileNavigationComponent =
	StackNavigationProp<ProfileRootStackParamList>

const ProfileStack = createStackNavigator<ProfileRootStackParamList>()

export const ProfileStackNavigator: FC = () => {
	const { Navigator, Screen } = ProfileStack
	return (
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen name="ProfileScreen" component={ProfileScreen}></Screen>
			<Screen name="MyPetGalleryScreen" component={MyPetGalleryScreen}></Screen>
		</Navigator>
	)
}
