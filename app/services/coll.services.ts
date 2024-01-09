import {
	DocumentData,
	DocumentReference,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	updateDoc,
	where,
} from 'firebase/firestore'
import { FIREBASE_DB, FIREBASE_STORAGE } from '~config/firebaseConfig'
import { IAnimalsData } from '~interfaces/animals.types'
import { TNotification } from '~interfaces/notification'

import { Constants, TCollections, TypeOwnUserColl } from './config.services'

const {
	ITEM_NOTIFICATIONS,
	COLLECTION_USERS,
	COLLECTION_ANIMALS,
	ITEM_OWM_ANIMALS,
	ITEM_FAVORITE,
} = Constants

export const CollectionServices = {
	async getHomeCollection(
		animalType: string,
		page: number,
		pageSize: number
	): Promise<{ data: IAnimalsData[] | []; totalPages: number }> {
		try {
			const collectionRef = collection(FIREBASE_DB, COLLECTION_ANIMALS)
			let queryRef

			if (animalType === 'All') {
				queryRef = collectionRef
			} else {
				queryRef = query(collectionRef, where('type', '==', animalType))
			}

			const totalDocsSnapshot = await getDocs(queryRef)
			const totalDocs = totalDocsSnapshot.size
			const totalPages = Math.ceil(totalDocs / pageSize)

			if (animalType === 'All') {
				queryRef = query(
					queryRef,
					orderBy('createdAt', 'desc'),
					limit(pageSize)
				)
			} else {
				queryRef = query(
					queryRef,
					orderBy('createdAt', 'desc'),
					limit(pageSize)
				)
			}

			if (page > 1) {
				const first = query(queryRef, limit((page - 1) * pageSize))
				const documentSnapshots = await getDocs(first)
				const lastVisible =
					documentSnapshots.docs[documentSnapshots.docs.length - 1]
				queryRef = query(queryRef, startAfter(lastVisible))
			}
			const querySnapshot = await getDocs(queryRef)

			const data: IAnimalsData[] = querySnapshot.docs.map((doc) => {
				const docData = doc.data()
				const docId = doc.id
				const formattedData: IAnimalsData = {
					id: docId,
					name: docData.name || '',
					color: docData.color || '',
					age: docData.age || { year: 0, month: 0, day: 0 },
					breed: docData.breed || '',
					imageUri: docData.imageUri || [],
					type: docData.type || '',
					description: docData.description || '',
					gender: docData.gender || '',
					weight: docData.weight || 0,
					vaccine: docData.vaccine || false,
					owner: docData.owner || {},
					createdAt: docData.createdAt || '',
					adoptedByUser: docData.adoptedByUser || null,
					...docData,
				}
				return formattedData
			})

			return { data, totalPages }
		} catch (error) {
			console.error('Error fetching collection: ', error)
			return { data: [], totalPages: 0 }
		}
	},

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

	async saveAnimalToGeneralColl(data: {}): Promise<string> {
		try {
			const docRef = await addDoc(collection(FIREBASE_DB, COLLECTION_ANIMALS), {
				...data,
			})
			return docRef.id
		} catch (error) {
			throw error
		}
	},

	async removeAnimalFromGeneralColl(animalId: string): Promise<void> {
		try {
			if (!animalId) {
				throw new Error('Animal ID is required')
			}
			const docRef = doc(FIREBASE_DB, COLLECTION_ANIMALS, animalId)
			const docSnapshot = await getDoc(docRef)

			if (!docSnapshot.exists()) {
				throw new Error('Animal document not found')
			}

			await deleteDoc(docRef)

			console.log('Animal removed from general collection')
		} catch (error) {
			throw error
		}
	},
	
	async addOwnAnimalToProfile(itemId: string, userId: string): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			await updateDoc(docRef, {
				[ITEM_OWM_ANIMALS]: arrayUnion(itemId),
			})
		} catch (error) {
			throw error
		}
	},

	async removeOwnAnimalFromProfile(
		itemId: string,
		userId: string
	): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const ownAnimalList = userData?.ownAnimals || []

				if (ownAnimalList.includes(itemId)) {
					await updateDoc(docRef, {
						[ITEM_OWM_ANIMALS]: arrayRemove(itemId),
					})
					await this.removeAnimalFromGeneralColl(itemId)
					console.log('Animal removed from from Profile')
				} else {
					console.log('Item ID not found in ownAnimalList')
				}
			} else {
				throw new Error('User document not found')
			}
		} catch (error) {
			throw error
		}
	},

	async getOwnAnimalColl(userId: string) {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.ownAnimals || []

				if (idList.length > 0) {
					const collectionRef = collection(FIREBASE_DB, COLLECTION_ANIMALS)
					const querySnapshot = await getDocs(collectionRef)
					const data = querySnapshot.docs
						.map((doc) => ({ ...doc.data(), id: doc.id }))
						.filter((item) => idList.includes(item.id))
					return data
				}
			} else {
				throw new Error('You dont have own collection')
			}
			return []
		} catch (error) {
			throw error
		}
	},

	async toggleFavoriteList(id: string, userId: string): Promise<void> {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				const userData = docSnapshot.data()
				const idList = userData?.favorites || []
				if (idList.includes(id)) {
					await updateDoc(docRef, {
						[ITEM_FAVORITE]: arrayRemove(id),
					})
					console.log(`Remove animal with ${id} from favorite list `)
				} else {
					await updateDoc(docRef, {
						[ITEM_FAVORITE]: arrayUnion(id),
					})
					console.log(`Add animal with ${id} from favorite list `)
				}
			}
		} catch (error) {
			throw error
		}
	},

	async getFavoriteColl(userId: string) {
		try {
			const userRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const userSnapshot = await getDoc(userRef)

			if (userSnapshot.exists()) {
				const idList = userSnapshot.data()?.favorites || []
				if (idList.length > 0) {
					const collectionRef = collection(FIREBASE_DB, COLLECTION_ANIMALS)
					const querySnapshot = await getDocs(collectionRef)
					const data = querySnapshot.docs
						.map((doc) => ({ ...doc.data(), id: doc.id }))
						.filter((item) => idList.includes(item.id))
					return data
				} else {
					console.log('No animals in favorites')
					return []
				}
			} else {
				console.log('User document not found')
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	},
}
