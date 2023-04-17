import { FC, useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { DatePickerInput } from '~components/ui/FormComponents/DatePickerInput/DatePickerInput'
import { PostImageGalleryList } from '~components/ui/FormComponents/PostImageGallery/PostImageGalleryList'
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
			<PostImageGalleryList quantityImages={quantity} />
			<View style={styles.selectWrapper}>
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
				<DatePickerInput />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight + 10,
		// borderWidth: 1,
		// borderColor: 'red',
		marginHorizontal: 20,
	},

	selectWrapper: {
		width: '100%',
	},
})