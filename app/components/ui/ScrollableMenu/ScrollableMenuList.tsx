import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { TSelectedAnimalType } from '~components/screens/MainScreen/HomeScreen'

import { ScrollableMenuItem } from './ScrollableMenuItem'
import { IMenuData } from './menu.data'

interface IScrollableMenuList {
	menu: IMenuData[]
	onPressTypeMenu: (animalType: TSelectedAnimalType) => void
	selectedAnimalType: string
}

export const ScrollableMenuList: FC<IScrollableMenuList> = ({
	menu,
	onPressTypeMenu,
	selectedAnimalType
}) => {
	
	return (
		<View style={styles.container}>
			<FlatList
				data={menu}
				horizontal
				renderItem={({ item }) => (
					<ScrollableMenuItem
						itemMenu={item}
						onPressTypeMenu={onPressTypeMenu}
						selectedAnimalType={selectedAnimalType}
					/>
				)}
				keyExtractor={(item) => String(item.id)}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
