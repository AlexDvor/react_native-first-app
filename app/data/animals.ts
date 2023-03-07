import { IAnimalsData } from 'interfaces/animals.types'

export const dataAnimals: IAnimalsData[] = [
	{
		id: 1,
		name: 'Miki',
		age: 2,
		imageUrl: require('../assets/images/animals/Photo_3.png'),
		type: 'cat',
		breed: 'British Longhair',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'male',
		weight: 3,
		vaccine: false,
		owner: { id: 11, name: 'Alex' },
	},

	{
		id: 2,
		name: 'Gary',
		age: 3,
		imageUrl: require('../assets/images/animals/Photo_1.png'),
		type: 'dog',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'male',
		weight: 8,
		vaccine: true,
		owner: { id: 11, name: 'Alex' },
	},

	{
		id: 3,
		name: 'Wolf',
		age: 4,
		imageUrl: require('../assets/images/animals/Photo_5.png'),
		type: 'dog',
		breed: 'Samoyed',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'male',
		weight: 12,
		vaccine: true,
		owner: { id: 11, name: 'Alex' },
	},

	{
		id: 4,
		name: 'Killer',
		age: 2,
		imageUrl: require('../assets/images/animals/Photo_6.png'),
		type: 'cat',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'male',
		weight: 3,
		vaccine: true,
		owner: { id: 11, name: 'Alex' },
	},
	{
		id: 5,
		name: 'Peach',
		age: 2.5,
		imageUrl: require('../assets/images/animals/Photo_2.png'),
		type: 'cat',
		breed: 'Half-Breed',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'male',
		weight: 3,
		vaccine: true,
		owner: { id: 11, name: 'Alex' },
	},
	{
		id: 6,
		name: 'Buggy',
		age: 4,
		imageUrl: require('../assets/images/animals/Photo_4.png'),
		type: 'cat',
		breed: 'Jack Russell terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'male',
		weight: 3,
		vaccine: true,
		owner: { id: 11, name: 'Alex' },
	},
]
