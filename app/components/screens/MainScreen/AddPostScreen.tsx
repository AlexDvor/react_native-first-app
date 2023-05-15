import { useNavigation } from '@react-navigation/native'
import 'firebase/storage'
import { FC, useEffect, useState } from 'react'
import { Alert, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { DatePickerInput } from '~components/ui/FormComponents/DatePickerInput/DatePickerInput'
import FormButton from '~components/ui/FormComponents/FormButton/FormButton'
import { PostDescriptionField } from '~components/ui/FormComponents/PostDescriptionField/PostDescriptionField'
import { PostImageGalleryList } from '~components/ui/FormComponents/PostImageGallery/PostImageGalleryList'
import { PostInput } from '~components/ui/FormComponents/PostInput/PostInput'
import { SelectPicker } from '~components/ui/FormComponents/SelectPicker/SelectPicker'
import { FIREBASE_AUTH } from '~config/firebaseConfig'
import { CONTAINER } from '~constants/theme'
import { catBreedsList } from '~data/cat.breeds'
import { dogBreedsList } from '~data/dog.breeds'
import { useAuth } from '~hooks/useAuth'
import { useValidateForm } from '~hooks/useValidateForm'
import { TFormState } from '~interfaces/form.state.types'
import { RootNavigationApp } from '~interfaces/tab.navigation.types'
import { UserService } from '~services/user/user.services'

const initialFormValue = {
	name: '',
	color: '',
	age: { year: '', month: '', day: '' },
	breed: '',
	imageUri: [],
	type: '',
	description: '',
	gender: '',
	weight: '',
	vaccine: false,
	owner: { id: '', name: '', avatar: '' },
}

export const AddPostScreen: FC = () => {
	const [formValue, setFormValue] = useState<TFormState>(initialFormValue)
	const [selectedTypeAnimal, setSelectedTypeAnimal] = useState<
		'Cat' | 'Dog' | ''
	>('')
	const [isLoading, setIsLoading] = useState(false)
	const [resetPicker, setResetPicker] = useState(false)
	const { isValidFormState } = useValidateForm(formValue)
	const { user } = useAuth()
	const navigation = useNavigation<RootNavigationApp>()

	useEffect(() => {
		if (formValue.type === 'Dog' || formValue.type === 'Cat') {
			return setSelectedTypeAnimal(formValue.type)
		}
		return setSelectedTypeAnimal('')
	}, [formValue])

	const handleResetForm = () => {
		setFormValue(initialFormValue)
		setResetPicker(true)
	}

	const handleSubmitForm = async () => {
		try {
			setIsLoading(true)
			const userId = user?.id || FIREBASE_AUTH.currentUser?.uid
			if (!userId) {
				throw new Error('Something is wrong with userId')
			}
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
			const animalId = await UserService.saveItemToCollectionAnimals(formData)
			// add information about animal to owner profile
			await UserService.addDataToProfile(userId, { animals: [animalId] })
			handleResetForm()
			navigation.navigate('Favorite', { screen: 'FavoriteScreen' })
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const selectCurrentListByType = () =>
		selectedTypeAnimal === 'Dog' ? dogBreedsList : catBreedsList

	return (
		<View style={styles.container}>
			<ScrollView
				style={{ width: '100%' }}
				showsVerticalScrollIndicator={false}
			>
				<PostImageGalleryList
					formState={setFormValue}
					resetPicker={resetPicker}
					setResetPicker={setResetPicker}
				/>
				<View style={styles.selectWrapper}>
					<PostInput
						placeholderText="Name"
						nameInput="name"
						formState={setFormValue}
						value={formValue.name}
					/>

					<PostInput
						placeholderText="Weight (in kilograms): 1.2, 3.5, 4"
						nameInput="weight"
						formState={setFormValue}
						keyboardType="numeric"
						value={formValue.weight.toString()}
					/>
					<PostInput
						placeholderText="Color: White, Black, White-Black"
						nameInput="color"
						formState={setFormValue}
						value={formValue.color}
					/>
					<SelectPicker
						listOption={[{ name: 'Female' }, { name: 'Male' }]}
						placeholderText="Select gender Animal"
						formState={setFormValue}
						nameInput="gender"
						resetPicker={resetPicker}
						setResetPicker={setResetPicker}
					/>
					<SelectPicker
						listOption={[{ name: 'Dog' }, { name: 'Cat' }]}
						placeholderText="Select type Animal"
						formState={setFormValue}
						nameInput="type"
						resetPicker={resetPicker}
						setResetPicker={setResetPicker}
					/>
					<SelectPicker
						listOption={selectCurrentListByType()}
						placeholderText={
							selectedTypeAnimal
								? `Select a ${selectedTypeAnimal} breed`
								: 'Select a type animal first'
						}
						formState={setFormValue}
						nameInput="breed"
						isDisabled={!selectedTypeAnimal ? true : false}
						resetPicker={resetPicker}
						setResetPicker={setResetPicker}
					/>

					<SelectPicker
						listOption={[{ name: 'Yes' }, { name: 'No' }]}
						placeholderText="Your animal has vaccine?"
						formState={setFormValue}
						nameInput="vaccine"
						isDisabled={false}
						resetPicker={resetPicker}
						setResetPicker={setResetPicker}
					/>

					<DatePickerInput
						formState={setFormValue}
						dateName="age"
						resetPicker={resetPicker}
						setResetPicker={setResetPicker}
					/>

					<PostDescriptionField
						formState={setFormValue}
						nameInput="description"
						placeholderText="Describe your friend"
						maxLengthInput={400}
						value={formValue.description}
					/>

					<FormButton
						title={'Submit'}
						onPress={handleSubmitForm}
						// disabled={!isValidFormState}
						isFetching={isLoading}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	listWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		...CONTAINER.mainContainer,
		alignItems: 'center',
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 20,
		marginBottom: 10,
	},

	selectWrapper: {
		width: '100%',
		marginTop: 10,
	},
})
