import { IAnimalsData } from 'interfaces/animals.types'
import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { ScrollableMenuItem } from './ScrollableMenuItem'
import { IMenuData } from './menu.data'

interface IScrollableMenuList {
	menu: IMenuData[]
}

export const ScrollableMenuList: FC<IScrollableMenuList> = ({ menu }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={menu}
				horizontal
				renderItem={({ item }) => <ScrollableMenuItem itemMenu={item} />}
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
