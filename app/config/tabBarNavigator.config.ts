import { Route, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { COLORS } from '~constants/theme'

const getTabBarActiveBackgroundColor = (
	route: Route<string> | undefined
): string | undefined => {
	if (!route) return
	const routeName = getFocusedRouteNameFromRoute(route)

	if (routeName === 'Favorite') {
		return 'red'
	}

	return 'white'
}

export const tabBarNavigatorConfig = {
	headerShown: false,
	tabBarShowLabel: false,
	tabBarActiveTintColor: COLORS.activeColorBtn,
	tabBarInactiveTintColor: COLORS.inActiveColorBtn,
	// tabBarActiveBackgroundColor: getTabBarActiveBackgroundColor,
	// tabBarActiveBackgroundColor: 'red',
	tabBarStyle: {
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		height: 60,
		backgroundColor: COLORS.backgroundTabNavigator,
	},
}
