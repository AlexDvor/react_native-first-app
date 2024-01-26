import { useEffect, useState } from 'react'
import { IAnimalsData } from '~interfaces/animals.types'

type TFormState = Partial<IAnimalsData>

export const useValidateForm = (formState: TFormState) => {
	const [hasSomeEmptyFields, setHasSomeEmptyFields] = useState(false)

	useEffect(() => {
		console.log('start validate')

		for (const key in formState) {
			if (!formState[key]) {
				setHasSomeEmptyFields(false)
				return
			}
		}

		if (!formState.imageUri || formState.imageUri.length === 0) {
			setHasSomeEmptyFields(false)
			return
		}

		setHasSomeEmptyFields(true)
	}, [formState])

	return {
		isValidFormState: hasSomeEmptyFields,
	}
}
