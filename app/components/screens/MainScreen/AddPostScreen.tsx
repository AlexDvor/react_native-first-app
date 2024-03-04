import { useNavigation } from '@react-navigation/native'
import 'firebase/storage'
import { FC, useEffect, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { DatePickerInput } from '~components/ui/FormComponents/DatePickerInput/DatePickerInput'
import FormButton from '~components/ui/FormComponents/FormButton/FormButton'
import { PostDescriptionField } from '~components/ui/FormComponents/PostDescriptionField/PostDescriptionField'
import { ImagePickerGalley } from '~components/ui/FormComponents/PostImageGallery/ImagePickerGalley'
import { PostInput } from '~components/ui/FormComponents/PostInput/PostInput'
import { SelectPicker } from '~components/ui/FormComponents/SelectPicker/SelectPicker'
import { CONTAINER } from '~constants/theme'
import { useCustomModal } from '~context/ModalProvider'
import { dataAnimals } from '~data/animals'
import { catBreedsList } from '~data/cat.breeds'
import { dogBreedsList } from '~data/dog.breeds'
import { FireBaseDefaultData } from '~helper/firebase/helperFireBaseData'
import { submitPostFormToFireStorage } from '~helper/firebase/submitPostForm'
import { useAuth } from '~hooks/useAuth'
import { useLocation } from '~hooks/useLocation'
import { useValidateForm } from '~hooks/useValidateForm'
import { IAnimalsData } from '~interfaces/animals.types'
import { TFormState } from '~interfaces/form.state.types'
import { RootNavigationApp } from '~interfaces/tab.navigation.types'

const initialFormValue = {
	name: '',
	color: '',
	age: { year: 0, month: 0, day: 0 },
	breed: '',
	imageUri: [],
	type: '',
	description: '',
	gender: '',
	weight: '',
	vaccine: false,
	owner: {
		id: '',
		name: '',
		avatar: '',
		location: {
			coords: { latitude: 0, longitude: 0 },
		},
	},
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
	const { locationDataUser, updateLocationUser } = useLocation()
	const { showModal } = useCustomModal()

	useEffect(() => {
		if (formValue.type === 'Dog' || formValue.type === 'Cat') {
			return setSelectedTypeAnimal(formValue.type)
		}
		return setSelectedTypeAnimal('')
	}, [formValue])

	const handleResetFormNavigate = () => {
		setFormValue(initialFormValue)
		setResetPicker(true)
		navigation.navigate('Profile')
	}

	const hasLocCoords =
		user?.location?.latitude && user?.location?.longitude ? true : false

	const selectCurrentListByType = () =>
		selectedTypeAnimal === 'Dog' ? dogBreedsList : catBreedsList

	const handleSubmitForm = async () => {
		try {
			setIsLoading(true)
			if (!user?.id) {
				throw new Error('Something is wrong with userId')
			}
			if (!hasLocCoords) {
				await new Promise<void>((resolve) => {
					showModal({
						text: 'To enhance your experience and ensure accurate data submission, please grant permission for location access before submitting, as we use your geolocation data solely to improve our services, prioritizing your privacy and data security.',
						confirmFn: async () => {
							try {
								if (!user?.id) return
								await updateLocationUser()
								const newFormValue = {
									...formValue,
									owner: {
										...formValue.owner,
										location: {
											coords: {
												...locationDataUser.coords,
											},
										},
									},
								}
								await submitPostFormToFireStorage(newFormValue, user.id)
								handleResetFormNavigate()
							} catch (error) {
								console.error('Error updating location:', error)
							} finally {
								resolve()
							}
						},
						cancelFn: async () => {
							console.log('cancelFn')
							try {
								if (!user?.id) return
								const newFormValue = {
									...formValue,
									owner: {
										...formValue.owner,
										location: {
											coords: {
												latitude: 0,
												longitude: 0,
											},
										},
									},
								}
								await submitPostFormToFireStorage(newFormValue, user.id)
								handleResetFormNavigate()
							} catch (error) {
								console.error('Error submitting form without location:', error)
							} finally {
								resolve()
							}
						},
					})
				})
			} else {
				console.log('defaultFn')
				const newFormValue = {
					...formValue,
					owner: {
						...formValue.owner,
						location: {
							coords: {
								latitude: locationDataUser.coords?.latitude,
								longitude: locationDataUser.coords?.longitude,
							},
						},
					},
				}
				await submitPostFormToFireStorage(newFormValue, user.id)
				handleResetFormNavigate()
			}
			// await FireBaseDefaultData.createDefaultDataBase(dataAnimals, user.id)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<ScrollView
				style={{ width: '100%' }}
				showsVerticalScrollIndicator={false}
			>
				<ImagePickerGalley
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
						onPress={() => handleSubmitForm()}
						disabled={!isValidFormState}
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
