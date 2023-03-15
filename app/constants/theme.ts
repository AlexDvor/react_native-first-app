import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
export const widthScreen = width
export const heightScreen = height

export const COLORS = {
	// primary: '#7F5DF0', // Light purple
	// secondary: '#5D2DFD', // Dark purple

	// white: '#fff',
	// black: '#000000',
	// green: '#37E39F',
	// red: '#F9A8BA',
	// gray: '#6A6A6A',
	// lightGray: '#dbdbdb',
	// lightGray1: '#f5f6fa',

	//title color

	// Button color
	primaryBtn: '#F2968F',
	secondaryBtn: '#111c1e',
	primaryTextColorBtn: '#FCFCFC',

	//Notification
	notificationDotColor: '#F2968F',
	notificationBackgroundColor: '#FCFCFC',

	// favoriteIcon
	iconFavoriteBg: '#111c1e',
	iconFavoriteColor: '#FCFCFC',

	//ItemCard

	ageCardContainerColor: '#fef6eb',
	genderCardContainerColor: '#e2e8fe',
	weightCardContainerColor: '#ffd9d8',
	vaccineCardContainerColor: '#eaffe0',
}
export const SIZES = {
	// global sizes
	// base: 8,
	// font: 14,
	// radius: 12,
	// padding: 24,

	// font sizes
	h1: 32,
	h2: 22,
	h3: 16,
	h4: 14,
	body1: 16,
	body2: 13,
	body3: 12,
	// body4: 14,
	// body5: 12,

	// app dimensions
	// width,
	// height
}
export const FONTS = {
	h1: {
		fontFamily: 'OpenSans-Bold',
		fontSize: SIZES.h1,
		lineHeight: 36,
	}, // poppins 700 400
	// h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
	// h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
	// h4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
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

	// body5: {
	// 	fontFamily: 'Roboto-Regular',
	// 	fontSize: SIZES.body5,
	// 	lineHeight: 22,
	// },

	buttonPrimaryFonts: {
		fontFamily: 'OpenSans-Medium',
		fontSize: 17,
		lineHeight: 20,
	},
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme
