import {
	DocumentData,
	DocumentReference,
	arrayUnion,
	updateDoc,
} from 'firebase/firestore'
import { TNotification } from '~interfaces/notification'

import {
	Constants,
	TCollections,
	TypeOwnUserColl,
} from './user/config.services'

const { ITEM_NOTIFICATIONS, COLLECTION_USERS } = Constants

export const CollectionServices = {
	async updateOwnUserColl(
		coll: TypeOwnUserColl,
		newData: [] | {} | boolean,
		ref: DocumentReference<DocumentData>
	): Promise<void> {
		const nameColl = Constants[coll]
		try {
			await updateDoc(ref, {
				[nameColl]: newData,
			})
		} catch (error) {
			throw error
		}
	},

	async addDocToCollection(
		coll: TCollections,
		newData: [] | {} | boolean,
		ref: DocumentReference<DocumentData>
	) {
		try {
			await updateDoc(ref, {
				[ITEM_NOTIFICATIONS]: arrayUnion(newData),
			})
		} catch (error) {
			throw error
		}
	},

	async findItemIndexColl(
		notifyId: string,
		coll: TNotification[]
	): Promise<number> {
		if (!Array.isArray(coll)) {
			throw new Error('Invalid collection type')
		}
		try {
			const itemIndex = coll.findIndex((item) => item.id === notifyId)
			if (itemIndex === -1) {
				throw new Error(`Item id not found in notification coll`)
			}
			return itemIndex
		} catch (error) {
			throw error
		}
	},
}
