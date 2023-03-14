import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { ChatScreen } from '~components/screens/MainScreen/ChatScreen/ChatScreen'
import { FavoriteScreen } from '~components/screens/MainScreen/FavoriteScreen/FavoriteScreen'
import { HomeRootNavigator } from '~components/screens/MainScreen/HomeScreen/HomeRootNavigator'
import { ProfileScreen } from '~components/screens/MainScreen/ProfileScreen/ProfileScreen'

const MainTabs = createBottomTabNavigator()

export default function App() {
	const { Navigator, Screen } = MainTabs
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
			<Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
				<Screen name="Home" component={HomeRootNavigator} />
				<Screen name="Profile" component={ProfileScreen} />
				<Screen name="Chat" component={ChatScreen} />
				<Screen name="Favorite" component={FavoriteScreen} />
			</Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({})
