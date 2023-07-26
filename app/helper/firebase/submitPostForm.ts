import { FIREBASE_AUTH } from '~config/firebaseConfig'
import { TFormState } from '~interfaces/form.state.types'
import { UserService } from '~services/user/user.services'

export const submitPostFormToFireStorage = async (
	formValue: TFormState,
	userId: string
) => {
	if (!userId) return

	try {
		const imageUrl = await UserService.uploadImageAsync(formValue.imageUri)
		const formData = {
			...formValue,
			imageUri: imageUrl,
			owner: {
				id: userId,
				name: FIREBASE_AUTH.currentUser?.displayName,
				avatar: FIREBASE_AUTH.currentUser?.photoURL || null,
			},
		}
		//save item to firebase and return animal id
		const animalId = await UserService.saveAnimalToGeneralColl(formData)

		// add information about animal to owner profile
		await UserService.addOwnAnimalToProfile(animalId, userId)
	} catch (error) {
		throw error
	}
}
