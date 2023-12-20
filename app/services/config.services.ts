export const Constants = {
	COLLECTION_ANIMALS: 'animals',
	COLLECTION_USERS: 'users',
	COLLECTION_CHAT: 'chats',
	ITEM_NOTIFICATIONS: 'notifications',
	ITEM_OWM_ANIMALS: 'ownAnimals',
	ITEM_FAVORITE: 'favorites',
	ITEM_CHAT: 'chat',
} as const

export type TCollections = keyof typeof Constants

type ExcludedCollectionKeys =
	| 'COLLECTION_ANIMALS'
	| 'COLLECTION_CHAT'
	| 'COLLECTION_USERS'

export type TypeOwnUserColl = Exclude<TCollections, ExcludedCollectionKeys>
