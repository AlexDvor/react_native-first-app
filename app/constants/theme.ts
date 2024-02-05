import { Dimensions } from 'react-native'
import { StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')
export const widthScreenDevice = width
export const heightScreenDevice = height

export const COLORS = {
	//common
	midGray: '#a1a09f',

	// Button color
	primaryBtn: '#F2968F',
	secondaryBtn: '#ffcc5c',
	inactiveBtn: '#cccecf',
	primaryTextColorBtn: '#253336',
	disableBackgroundBtn: '#755a58',

	//Notification
	notificationDotColor: '#F2968F',
	notificationBackgroundColor: '#FCFCFC',

	// Messages

	messageDotColor: 'red',

	// favoriteIcon
	iconFavoriteBg: '#111c1e',
	iconFavoriteColor: '#FCFCFC',

	//ItemCard
	ageCardContainerColor: '#fef6eb',
	genderCardContainerColor: '#e2e8fe',
	weightCardContainerColor: '#ffd9d8',
	vaccineCardContainerColor: '#eaffe0',

	//
	placeholderTextColor: '#949494',

	//BottomTabNavigator

	activeColorBtn: '#F2968F',
	inActiveColorBtn: '#949494',
	activeBackgroundColor: '#F2968F',
	backgroundTabNavigator: '#FCFCFC',

	//spinner
	spinnerColor: '#F2968F',

	//screens

	screenBackgroundColor: '#ffffff',
	screenHeaderBackgroundColor: '#ffffff',

	//skeleton

	skeletonBackgroundColor: '#f3f3f3',
	skeletonForegroundColor: '#d4d4d4',
}

export const CONTAINER = {
	mainContainer: {
		marginTop: StatusBar.currentHeight,
		marginHorizontal: 10,
	},
}

export const SIZES = {
	h1: 32,
	h2: 22,
	h3: 16,
	h4: 14,
	body1: 16,
	body2: 13,
	body3: 12,
}
export const FONTS = {
	h1: {
		fontFamily: 'OpenSans-Bold',
		fontSize: SIZES.h1,
		lineHeight: 36,
	},

	body1: {
		fontFamily: 'OpenSans-Bold',
		fontSize: SIZES.body1,
		lineHeight: 20,
	},
	body2: {
		fontFamily: 'OpenSans-Regular',
		fontSize: SIZES.body2,
		lineHeight: 16,
	},
	body3: {
		fontFamily: 'OpenSans-Regular',
		fontSize: SIZES.body3,
		lineHeight: 14,
	},
	bodyCard1: {
		fontFamily: 'OpenSans-Bold',
		fontSize: SIZES.body1,
		lineHeight: 22,
	},

	buttonPrimaryFonts: {
		fontFamily: 'OpenSans-Medium',
		fontSize: 17,
		lineHeight: 20,
	},

	inputFont: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 14,
		lineHeight: 14,
	},
}

const appTheme = { COLORS, SIZES, FONTS, CONTAINER }

export default appTheme
