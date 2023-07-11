import { FIREBASE_AUTH } from '~config/firebaseConfig'
import { useAuth } from '~hooks/useAuth'
import { TFormState } from '~interfaces/form.state.types'
import { UserService } from '~services/user/user.services'

const PROFILE_ID = FIREBASE_AUTH.currentUser?.uid

export const submitPostFormToFireStorage = async (formValue: TFormState) => {
	const { user } = useAuth()
	if (!user?.id) return

	try {
		const imageUrl = await UserService.uploadImageAsync(formValue.imageUri)
		const formData = {
			...formValue,
			imageUri: imageUrl,
			owner: {
				id: user.id,
				name: FIREBASE_AUTH.currentUser?.displayName,
				avatar: FIREBASE_AUTH.currentUser?.photoURL || null,
			},
		}
		//save item to firebase and return animal id
		const animalId = await UserService.saveAnimalToGeneralColl(formData)

		// add information about animal to owner profile
		await UserService.addOwnAnimalToProfile(animalId, user.id)
	} catch (error) {
		throw error
	}
}
