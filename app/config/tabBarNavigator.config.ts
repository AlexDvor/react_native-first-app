import { COLORS } from '~constants/theme'

export const tabBarNavigatorConfig = {
	headerShown: false,
	tabBarShowLabel: false,
	tabBarActiveTintColor: COLORS.activeColorBtn,
	tabBarInactiveTintColor: COLORS.inActiveColorBtn,
	tabBarStyle: {
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		height: 60,
		backgroundColor: COLORS.backgroundTabNavigator,
	},
}

export const screenOptionsConf = {
	cardStyle: {
		backgroundColor: COLORS.screenBackgroundColor,
	},
	headerStyle: {
		backgroundColor: COLORS.screenHeaderBackgroundColor,
	},
}
