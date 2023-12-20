import { serverTimestamp } from 'firebase/firestore'
import { FIREBASE_AUTH } from '~config/firebaseConfig'
import { TFormState } from '~interfaces/form.state.types'
import { CollectionServices } from '~services/coll.services'
import { ImageService } from '~services/image.services'

export const submitPostFormToFireStorage = async (
	formValue: TFormState,
	userId: string
) => {
	if (!userId) return

	try {
		const imageUrl = await ImageService.uploadImageAsync(formValue.imageUri)

		const formData = {
			...formValue,
			imageUri: imageUrl,
			createdAt: serverTimestamp(),
			owner: {
				id: userId,
				name: FIREBASE_AUTH.currentUser?.displayName,
				avatar: FIREBASE_AUTH.currentUser?.photoURL || null,
			},
			adoptedByUser: null,
		}
		//save item to firebase and return animal id

		const animalId = await CollectionServices.saveAnimalToGeneralColl(formData)

		// add information about animal to owner profile
		await CollectionServices.addOwnAnimalToProfile(animalId, userId)
	} catch (error) {
		throw error
	}
}
