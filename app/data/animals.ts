export type TAnimalsData = {
	name: string
	color: string
	age: { year: number; month: number; day: number }
	breed: string
	imageUri: string[]
	type: string
	description: string
	gender: string
	weight: number
	vaccine: boolean
	owner: { id: number; name: string; avatar: string | null }
}

export const dataAnimals: TAnimalsData[] = [
	{
		name: 'Jerry',
		age: { year: 2022, month: 2, day: 15 },
		imageUri: [
			require('../assets/images/animals/Photo_1.png'),
			require('../assets/images/animals/Photo_2.png'),
		],

		type: 'dog',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles',
		gender: 'Male',
		weight: 3,
		vaccine: false,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},

	{
		name: 'Gary',
		age: { year: 2023, month: 0, day: 1 },
		imageUri: [require('../assets/images/animals/Photo_1.png')],
		type: 'dog',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'Female',
		weight: 8,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},

	{
		name: 'Wolf',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_5.png')],
		type: 'dog',
		breed: 'Samoyed',
		description:
			'My dog is incredibly and unconditionally loyal to me. He loves me as much as I love him or sometimes more.',
		gender: 'Male',
		weight: 12,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},

	{
		name: 'Killer',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_6.png')],
		type: 'cat',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles',
		gender: 'Male',
		weight: 3,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},
	{
		name: 'Peach',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_2.png')],
		type: 'cat',
		breed: 'Half-Breed',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'Male',
		weight: 3,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},
	{
		name: 'Buggy',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_4.png')],
		type: 'cat',
		breed: 'Jack Russell terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'Male',
		weight: 3,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},
	{
		name: 'Miki',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_3.png')],
		type: 'cat',
		breed: 'British Longhair',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'Male',
		weight: 3,
		vaccine: false,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},

	{
		name: 'Gary',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_1.png')],
		type: 'dog',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'Male',
		weight: 8,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},

	{
		name: 'Wolf',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_5.png')],
		type: 'dog',
		breed: 'Samoyed',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'Male',
		weight: 12,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},

	{
		name: 'Killer',
		age: { year: 2022, month: 2, day: 24 },
		imageUri: [require('../assets/images/animals/Photo_6.png')],
		type: 'cat',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
		gender: 'Male',
		weight: 3,
		vaccine: true,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
	},
]
