import { FieldValue, serverTimestamp } from 'firebase/firestore'

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
	createdAt: FieldValue
	adoptedByUser: { id: string; name: string; avatar: string | null } | null
}

// export const dataAnimals: TAnimalsData[] = [
// 	{
// 		name: 'Jerry',
// 		age: { year: 2022, month: 2, day: 15 },
// 		imageUri: [
// 			require('../assets/images/animals/Photo_1.png'),
// 			require('../assets/images/animals/Photo_2.png'),
// 		],

// 		type: 'Dog',
// 		breed: 'Australian Terrier',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles',
// 		gender: 'Male',
// 		weight: 3,
// 		vaccine: false,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},

// 	{
// 		name: 'Gary',
// 		age: { year: 2023, month: 0, day: 1 },
// 		imageUri: [require('../assets/images/animals/Photo_2.png')],
// 		type: 'Cat',
// 		breed: 'Australian Terrier',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
// 		gender: 'Female',
// 		weight: 8,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},

// 	{
// 		name: 'Wolf',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_3.png')],
// 		type: 'Cat',
// 		breed: 'Samoyed',
// 		description:
// 			'My dog is incredibly and unconditionally loyal to me. He loves me as much as I love him or sometimes more.',
// 		gender: 'Male',
// 		weight: 12,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},

// 	{
// 		name: 'Killer',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_4.png')],
// 		type: 'Dog',
// 		breed: 'Australian Terrier',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles',
// 		gender: 'Male',
// 		weight: 3,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},
// 	{
// 		name: 'Peach',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_5.png')],
// 		type: 'Dog',
// 		breed: 'Half-Breed',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
// 		gender: 'Male',
// 		weight: 3,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},
// 	{
// 		name: 'Buggy',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_6.png')],
// 		type: 'Dog',
// 		breed: 'Jack Russell terrier',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
// 		gender: 'Male',
// 		weight: 3,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},
// 	{
// 		name: 'Miki',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_2.png')],
// 		type: 'Cat',
// 		breed: 'British Longhair',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
// 		gender: 'Male',
// 		weight: 3,
// 		vaccine: false,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},

// 	{
// 		name: 'Gary',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_1.png')],
// 		type: 'Dog',
// 		breed: 'Australian Terrier',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
// 		gender: 'Male',
// 		weight: 8,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},

// 	{
// 		name: 'Wolf',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_5.png')],
// 		type: 'Dog',
// 		breed: 'Samoyed',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
// 		gender: 'Male',
// 		weight: 12,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},

// 	{
// 		name: 'Killer',
// 		age: { year: 2022, month: 2, day: 24 },
// 		imageUri: [require('../assets/images/animals/Photo_6.png')],
// 		type: 'Dog',
// 		breed: 'Australian Terrier',
// 		description:
// 			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
// 		gender: 'Male',
// 		weight: 3,
// 		vaccine: true,
// 		owner: { id: 11, name: 'Alex', avatar: null },
// 		color: 'Grey',
// 		createdAt: serverTimestamp(),
// 		adoptedByUser: null,
// 	},
// ]

export const dataAnimals: TAnimalsData[] = [
	{
		name: 'Toby',
		age: { year: 2022, month: 2, day: 15 },
		imageUri: [
			require('../assets/images/animals/Photo_1.png'),
			require('../assets/images/animals/Photo_2.png'),
		],

		type: 'Dog',
		breed: 'Australian Terrier',
		description:
			'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles',
		gender: 'Male',
		weight: 3,
		vaccine: false,
		owner: { id: 11, name: 'Alex', avatar: null },
		color: 'Grey',
		createdAt: serverTimestamp(),
		adoptedByUser: null,
	},

	// {
	// 	name: 'Boby',
	// 	age: { year: 2023, month: 0, day: 1 },
	// 	imageUri: [require('../assets/images/animals/Photo_2.png')],
	// 	type: 'Cat',
	// 	breed: 'Australian Terrier',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
	// 	gender: 'Female',
	// 	weight: 8,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },

	// {
	// 	name: 'Bob',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_3.png')],
	// 	type: 'Cat',
	// 	breed: 'Samoyed',
	// 	description:
	// 		'My dog is incredibly and unconditionally loyal to me. He loves me as much as I love him or sometimes more.',
	// 	gender: 'Male',
	// 	weight: 12,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },

	// {
	// 	name: 'Katy',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_4.png')],
	// 	type: 'Dog',
	// 	breed: 'Australian Terrier',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles',
	// 	gender: 'Male',
	// 	weight: 3,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },
	// {
	// 	name: 'Peach',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_5.png')],
	// 	type: 'Dog',
	// 	breed: 'Half-Breed',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
	// 	gender: 'Male',
	// 	weight: 3,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },
	// {
	// 	name: 'Buggy',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_6.png')],
	// 	type: 'Dog',
	// 	breed: 'Jack Russell terrier',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
	// 	gender: 'Male',
	// 	weight: 3,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },
	// {
	// 	name: 'Miki',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_2.png')],
	// 	type: 'Cat',
	// 	breed: 'British Longhair',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
	// 	gender: 'Male',
	// 	weight: 3,
	// 	vaccine: false,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },

	// {
	// 	name: 'Gary',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_1.png')],
	// 	type: 'Dog',
	// 	breed: 'Australian Terrier',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
	// 	gender: 'Male',
	// 	weight: 8,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },

	// {
	// 	name: 'Wolf',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_5.png')],
	// 	type: 'Dog',
	// 	breed: 'Samoyed',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
	// 	gender: 'Male',
	// 	weight: 12,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },

	// {
	// 	name: 'Killer',
	// 	age: { year: 2022, month: 2, day: 24 },
	// 	imageUri: [require('../assets/images/animals/Photo_6.png')],
	// 	type: 'Dog',
	// 	breed: 'Australian Terrier',
	// 	description:
	// 		'The kindest Samoyed weve ever met. Likes to play with balls, is friends with other animals. Despite the white color, he loves rain and puddles.',
	// 	gender: 'Male',
	// 	weight: 3,
	// 	vaccine: true,
	// 	owner: { id: 11, name: 'Alex', avatar: null },
	// 	color: 'Grey',
	// 	createdAt: serverTimestamp(),
	// 	adoptedByUser: null,
	// },
]
