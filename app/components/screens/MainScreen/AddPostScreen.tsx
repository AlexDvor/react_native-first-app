import { FC, useEffect, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { DatePickerInput } from '~components/ui/FormComponents/DatePickerInput/DatePickerInput'
import FormButton from '~components/ui/FormComponents/FormButton/FormButton'
import { PostDescriptionField } from '~components/ui/FormComponents/PostDescriptionField/PostDescriptionField'
import { PostImageGalleryList } from '~components/ui/FormComponents/PostImageGallery/PostImageGalleryList'
import { PostInput } from '~components/ui/FormComponents/PostInput/PostInput'
import { SelectPicker } from '~components/ui/FormComponents/SelectPicker/SelectPicker'
import { catBreedsList } from '~data/cat.breeds'
import { dogBreedsList } from '~data/dog.breeds'
import { useValidateForm } from '~hooks/useValidateForm'
import { TFormState } from '~interfaces/form.state.types'

type TAnimal = 'Cat' | 'Dog' | ''

const initialFormValue = {
	name: '',
	color: '',
	age: 0,
	breed: '',
	imageUri: [],
	type: '',
	description: '',
	gender: '',
	weight: 0,
	vaccine: false,
}

export const AddPostScreen: FC = () => {
	const [formValue, setFormValue] = useState<TFormState>(initialFormValue)
	const [typeAnimal, setTypeAnimal] = useState<TAnimal>('')
	const { isValidFormState } = useValidateForm(formValue)

	useEffect(() => {
		if (formValue.type === 'Dog' || formValue.type === 'Cat') {
			return setTypeAnimal(formValue.type)
		}
		return setTypeAnimal('')
	}, [formValue])

	const handleSubmitForm = () => {
		console.log('state', formValue)
	}

	const selectCurrentListByType = () =>
		typeAnimal === 'Dog' ? dogBreedsList : catBreedsList

	return (
		<View style={styles.container}>
			<ScrollView
				style={{ width: '100%' }}
				showsVerticalScrollIndicator={false}
			>
				<PostImageGalleryList formState={setFormValue} />
				<View style={styles.selectWrapper}>
					<PostInput
						placeholderText="Name"
						nameInput="name"
						formState={setFormValue}
					/>

					<PostInput
						placeholderText="Weight"
						nameInput="weight"
						formState={setFormValue}
					/>
					<PostInput
						placeholderText="Color"
						nameInput="color"
						formState={setFormValue}
					/>
					<SelectPicker
						listOption={[{ name: 'Female' }, { name: 'Male' }]}
						placeholderText="Select gender Animal"
						formState={setFormValue}
						nameInput="gender"
						isDisabled={false}
					/>
					<SelectPicker
						listOption={[{ name: 'Dog' }, { name: 'Cat' }]}
						placeholderText="Select type Animal"
						formState={setFormValue}
						nameInput="type"
						isDisabled={false}
					/>
					<SelectPicker
						listOption={selectCurrentListByType()}
						placeholderText={
							typeAnimal
								? `Select a ${typeAnimal} breed`
								: 'Select a type animal first'
						}
						formState={setFormValue}
						nameInput="breed"
						isDisabled={!typeAnimal ? true : false}
					/>

					<SelectPicker
						listOption={[{ name: 'Yes' }, { name: 'No' }]}
						placeholderText="Your animal has vaccine?"
						formState={setFormValue}
						nameInput="vaccine"
						isDisabled={false}
					/>

					<DatePickerInput formState={setFormValue} dateName="age" />

					<PostDescriptionField
						formState={setFormValue}
						nameInput="description"
						placeholderText="Describe your friend"
						maxLengthInput={400}
					/>

					<FormButton
						title={'Submit'}
						onPress={handleSubmitForm}
						disabled={!isValidFormState}
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
		alignItems: 'center',
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 15,
		marginBottom: 10,
		marginHorizontal: 20,
	},

	selectWrapper: {
		width: '100%',
		marginTop: 10,
	},
})
