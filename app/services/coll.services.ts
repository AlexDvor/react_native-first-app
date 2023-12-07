import {
	DocumentData,
	DocumentReference,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore'
import { FIREBASE_DB } from '~config/firebaseConfig'
import { TNotification } from '~interfaces/notification'
import { IAllCollectionsUser } from '~interfaces/user.types'

import {
	Constants,
	TCollections,
	TypeOwnUserColl,
} from './user/config.services'

const { ITEM_NOTIFICATIONS, COLLECTION_USERS } = Constants

export const CollectionServices = {
	async getAllCollectionsUser(userId: string): Promise<{
		data: IAllCollectionsUser
		userDocRef: DocumentReference<DocumentData>
	}> {
		// remove to another class
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (!docSnapshot.exists()) {
				throw new Error('User not found')
			}

			const userData = docSnapshot.data()
			if (userData) {
				return {
					data: userData as IAllCollectionsUser,
					userDocRef: docRef,
				}
			} else {
				throw new Error('User data is invalid')
			}
		} catch (error) {
			throw error
		}
	},

	// async getCollByName(
	// 	collName: TCollections,
	// 	allCollectionUser: IAllCollectionsUser
	// ): Promise<TNotification[]> {
	// 	try {
	// 		const nameColl = Constants[collName]

	// 		if (nameColl) {
	// 			const collection = allCollectionUser[nameColl]

	// 			if (collection) {
	// 				return collection
	// 			} else {
	// 				throw new Error(`❌ ~ This ${collection} not exist`)
	// 			}
	// 		} else {
	// 			throw new Error(
	// 				`❌ ~ This ${collName} name does not exist in the users database`
	// 			)
	// 		}
	// 	} catch (error) {
	// 		throw error
	// 	}
	// },

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
