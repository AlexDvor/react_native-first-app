import { IAnimalsData } from 'interfaces/animals.types'
import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { IMenuData } from './menu.data'

interface IScrollableMenuItem {
	itemMenu: IMenuData
}

export const ScrollableMenuItem: FC<IScrollableMenuItem> = ({ itemMenu }) => {
	return (
		<>
			<View style={styles.container}>
				<Image source={itemMenu.image} style={styles.image}></Image>
				<Text>{itemMenu.title}</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		width: 100,
		height: 52,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginRight: 20,
		borderColor: '#d9d9d9c9',
	},
	image: {
		width: 32,
		height: 32,
		marginRight: 8,
	},
})
