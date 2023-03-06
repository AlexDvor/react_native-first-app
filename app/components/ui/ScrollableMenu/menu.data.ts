import { ImageSourcePropType } from 'react-native'

export interface IMenuData {
	id: number
	title: 'All' | 'Dog' | 'Cat'
	image: ImageSourcePropType
}

export const menuData: IMenuData[] = [
	{ id: 1, title: 'All', image: require('../../../assets/images/nav/all.png') },
	{
		id: 2,
		title: 'Cat',
		image: require('../../../assets/images/nav/cats.png'),
	},
	{
		id: 3,
		title: 'Dog',
		image: require('../../../assets/images/nav/dogs.png'),
	},
]
