import { useEffect, useState } from 'react'

interface useValidateFormProps {
	[key: string]: any
}

export const useValidateForm = (formState: useValidateFormProps) => {
	const [hasSomeEmptyFields, setHasSomeEmptyFields] = useState<boolean>(false)

	useEffect(() => {
		for (const key in formState) {
			if (!formState[key]) {
				setHasSomeEmptyFields(false)
				return
			}
		}

		if (formState.imageUri.length === 0) {
			setHasSomeEmptyFields(false)
			return
		}

		setHasSomeEmptyFields(true)
	}, [formState])

	return {
		isValidFormState: hasSomeEmptyFields,
	}
}
