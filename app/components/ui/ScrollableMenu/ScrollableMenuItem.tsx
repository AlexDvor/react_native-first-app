import { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TSelectedAnimalType } from '~components/screens/MainScreen/HomeScreen'

import { IMenuData } from './menu.data'

interface IScrollableMenuItem {
	itemMenu: IMenuData
	onPressTypeMenu: (animalType: TSelectedAnimalType) => void
	selectedAnimalType: string
}

export const ScrollableMenuItem: FC<IScrollableMenuItem> = ({
	itemMenu,
	onPressTypeMenu,
	selectedAnimalType,
}) => {
	
	
	

	return (
		<>
			<TouchableOpacity
				style={[styles.container, selectedAnimalType===itemMenu.title && styles.activeBtn]}
				onPress={() => onPressTypeMenu(itemMenu.title)}
			>
				<Image source={itemMenu.image} style={styles.image}></Image>
				<Text>{itemMenu.title}</Text>
			</TouchableOpacity>
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
	activeBtn:{
		backgroundColor:"#F2968F",
		borderWidth:0
	}
})
