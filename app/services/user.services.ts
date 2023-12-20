
import {
	DocumentData,
	DocumentReference,
	doc,
	getDoc,
	setDoc,
} from 'firebase/firestore'
import { FIREBASE_DB } from '~config/firebaseConfig'
import { IUpdOwnProfile, IUserData } from '~interfaces/user.types'

import { Constants } from './config.services'

const { COLLECTION_USERS } = Constants

export const UserService = {
	async getUserRef(
		userId: string
	): Promise<{ user: IUserData; userDocRef: DocumentReference<DocumentData> }> {
		try {
			const userDocRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)
			const userDocSnapshot = await getDoc(userDocRef)

			if (userDocSnapshot.exists()) {
				const userData = userDocSnapshot.data() as IUserData
				const user: IUserData = {
					id: userDocRef.id,
					name: userData?.name || '',
					email: userData.email || '',
					emailVerified: userData.emailVerified || false,
					phoneNumber: userData.phoneNumber || '',
					avatar: userData?.avatar || '',
					chats: userData?.chats || [],
					ownAnimals: userData?.ownAnimals || [],
					favorites: userData.favorites || [],
					notifications: userData.notifications || [],
				}

				return { user, userDocRef }
			} else {
				throw new Error(`User with ${userId} not found`)
			}
		} catch (error) {
			throw error
		}
	},

	async creatingOwnerProfile(
		userId: string,
		userData: IUpdOwnProfile
	): Promise<void> {
		if (!userId) return
		try {
			const docRef = doc(FIREBASE_DB, COLLECTION_USERS, userId)

			await setDoc(docRef, userData)
		} catch (error) {
			throw error
		}
	},

	
}
