import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { StyleSheet } from 'react-native'
import { AnimalProfileScreen } from '~components/screens/MainScreen/AnimalProfileScreen'
import { ChatScreen } from '~components/screens/MainScreen/ChatScreen'
import { FavoriteScreen } from '~components/screens/MainScreen/FavoriteScreen'
import { HomeScreen } from '~components/screens/MainScreen/HomeScreen'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen'
import { StartScreen } from '~components/screens/MainScreen/StartScreen'

const MainTabs = createBottomTabNavigator()

export default function App() {
	const [fontsLoaded] = useFonts({
		'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
		'OpenSans-Bold': require('./app/assets/fonts/OpenSans-Bold.ttf'),
		'OpenSans-Medium': require('./app/assets/fonts/OpenSans-Medium.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<NavigationContainer>
			<MainTabs.Navigator>
				<MainTabs.Screen name="HomeScreen" component={HomeScreen} />
				<MainTabs.Screen name="ProfileScreen" component={ProfileScreen} />
				<MainTabs.Screen name="ChatScreen" component={ChatScreen} />
				<MainTabs.Screen name="FavoriteScreen" component={FavoriteScreen} />
			</MainTabs.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({})
