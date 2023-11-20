export const Constants = {
	COLLECTION_ANIMALS: 'animals',
	COLLECTION_USERS: 'users',
	COLLECTION_CHAT: 'chats',
	ITEM_NOTIFICATIONS: 'notifications',
	ITEM_OWM_ANIMALS: 'ownAnimals',
	ITEM_FAVORITE: 'favorites',
	ITEM_CHAT: 'chat',
}

export type TCollections = keyof typeof Constants
