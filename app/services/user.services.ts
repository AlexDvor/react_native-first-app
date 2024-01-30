import { updateProfile } from 'firebase/auth'
import {
	DocumentData,
	DocumentReference,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_DB } from '~config/firebaseConfig'
import { IUpdOwnProfile, IUserData, IUserProfile } from '~interfaces/user.types'

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
				const userData = userDocSnapshot.data()
				const user: IUserData = {
					id: userDocRef.id,
					name: userData?.name || '',
					email: userData.email || '',
					emailVerified: userData.emailVerified || false,
					phoneNumber: userData.phoneNumber || '',
					avatar: userData?.avatar || '',
					chats: userData?.chat || [],
					ownAnimals: userData?.ownAnimals || [],
					favorites: userData.favorites || [],
					notifications: userData.notifications || [],
					location: userData.location || null,
				}

				return { user, userDocRef }
			} else {
				throw new Error(`User with ${userId} not found`)
			}
		} catch (error) {
			throw error
		}
	},

	async updateDataUser(
		userId: string,
		updatedUserData: Partial<IUserProfile>
	): Promise<IUserProfile> {
		try {
			const { userDocRef } = await this.getUserRef(userId)
			const userDocSnapshot = await getDoc(userDocRef)
			if (userDocSnapshot.exists()) {
				await updateDoc(userDocRef, updatedUserData)
				await this.updateNameOrAvatar(updatedUserData)
				const updatedUserDocSnapshot = await getDoc(userDocRef)
				const userData = updatedUserDocSnapshot.data() as IUserData
				return {
					avatar: userData.avatar,
					email: userData.email,
					emailVerified: userData.emailVerified,
					id: userId,
					name: userData.name,
					phoneNumber: userData.phoneNumber,
					location: userData.location,
				}
			} else {
				throw new Error(`User with ID ${userId} not found`)
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

	async updateNameOrAvatar(updatedUserData: Partial<IUserProfile>) {
		const { avatar, name } = updatedUserData
		const currentUser = FIREBASE_AUTH.currentUser

		try {
			if (currentUser) {
				if (avatar) {
					await updateProfile(currentUser, { photoURL: avatar })
				}

				if (name) {
					await updateProfile(currentUser, { displayName: name })
				}
			} else {
				throw new Error('User not found')
			}
		} catch (error) {
			console.error('updateNameOrAvatar:', error)
			throw error
		}
	},
}
