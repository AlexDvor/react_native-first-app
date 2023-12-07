import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '~config/firebaseConfig'
import { TestAnimalTypes } from '~data/animals'
import { IAnimalsData, IOwnerInfo } from '~interfaces/animals.types'

import { Constants } from './user/config.services'

const { COLLECTION_ANIMALS, ITEM_OWM_ANIMALS } = Constants

export const AnimalService = {
	async getAnimalById(animalId: string) {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_ANIMALS, animalId)
			const docSnapshot = await getDoc(docRef)
			if (docSnapshot.exists()) {
				const animalData = docSnapshot.data() as IAnimalsData
				const formattedData: IAnimalsData = {
					id: animalId,
					name: animalData.name,
					color: animalData.color,
					age: animalData.age,
					breed: animalData.breed,
					imageUri: animalData.imageUri,
					type: animalData.type,
					description: animalData.description,
					gender: animalData.gender,
					weight: animalData.weight,
					vaccine: animalData.vaccine,
					owner: animalData.owner,
					adoptedByUser: animalData.adoptedByUser,
					createdAt: animalData.createdAt,
				}
				return formattedData
			} else {
				throw new Error(`Animal with ${animalId} not found`)
			}
		} catch (error) {
			throw error
		}
	},

	async updateAdoptedByUser(animalId: string, newAdoptedByUser: IOwnerInfo) {
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_ANIMALS, animalId)
			const docSnapshot = await getDoc(docRef)

			if (docSnapshot.exists()) {
				await updateDoc(docRef, {
					adoptedByUser: newAdoptedByUser,
				})
			} else {
				throw new Error(`Animal with ID ${animalId} not found`)
			}
		} catch (error) {
			throw error
		}
	},
}
