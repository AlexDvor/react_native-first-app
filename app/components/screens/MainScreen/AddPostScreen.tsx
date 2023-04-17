import { FC, useEffect, useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { DatePickerInput } from '~components/ui/FormComponents/DatePickerInput/DatePickerInput'
import FormButton from '~components/ui/FormComponents/FormButton/FormButton'
import { PostImageGalleryList } from '~components/ui/FormComponents/PostImageGallery/PostImageGalleryList'
import { PostInput } from '~components/ui/FormComponents/PostInput/PostInput'
import { SelectPicker } from '~components/ui/FormComponents/SelectPicker/SelectPicker'
import { catBreedsList } from '~data/cat.breeds'
import { dogBreedsList } from '~data/dog.breeds'
import { IAnimalsData } from '~interfaces/animals.types'

type TAnimal = 'Cat' | 'Dog' | null

type TFormState = IAnimalsData | { type?: TAnimal }

export const AddPostScreen: FC = () => {
	const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const [formValue, setFormValue] = useState<TFormState>({})
	const [typeAnimal, setTypeAnimal] = useState<TAnimal>(null)

	useEffect(() => {
		formValue?.type ? setTypeAnimal(formValue.type) : setTypeAnimal(null)
		console.log('❌ ~ typeAnimal:', typeAnimal)
		console.log('❌ ~ formValue:', formValue)
	}, [formValue])

	const handleSubmitForm = () => {}

	const selectCurrentListByType = () =>
		typeAnimal === 'Dog' ? dogBreedsList : catBreedsList

	return (
		<View style={styles.container}>
			<ScrollView style={{ width: '100%' }}>
				<PostImageGalleryList quantityImages={quantity} />
				<View style={styles.selectWrapper}>
					<PostInput
						placeholderText="Name"
						nameInput="name"
						formState={setFormValue}
					/>

					<PostInput
						placeholderText="Weight"
						nameInput="Weight"
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

					<FormButton title={'Submit'} />
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
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 10,
		marginBottom: StatusBar.currentHeight && StatusBar.currentHeight,
		// borderWidth: 1,
		// borderColor: 'red',
		marginHorizontal: 20,
	},

	selectWrapper: {
		width: '100%',
	},
})
