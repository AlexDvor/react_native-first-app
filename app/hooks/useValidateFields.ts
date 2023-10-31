import { useEffect, useState } from 'react'

interface TOperationScreen {
	type: 'login' | 'register'
	fieldsState: {
		name?: string
		email: string
		password: string
	}
}

const LENGTH_EMAIL = 5
const LENGTH_PASSWORD = 6

export const useValidateFields = (
	type: TOperationScreen['type'],
	fieldsState: TOperationScreen['fieldsState']
) => {
	const [isEmptyField, setIsEmptyField] = useState(true)
	const { name, email, password } = fieldsState

	const validateFields = () => {
		if (type === 'register') {
			const validNameField = name !== ''
			const validEmailField = email !== '' && email.length >= LENGTH_EMAIL
			const validPasswordField =
				password !== '' && password.length >= LENGTH_PASSWORD
			if (validNameField && validEmailField && validPasswordField) {
				setIsEmptyField(false)
			} else {
				setIsEmptyField(true)
			}
		} else if (type === 'login') {
			const validEmailField = email !== '' && email.length >= LENGTH_EMAIL
			const validPasswordField =
				password !== '' && password.length >= LENGTH_PASSWORD
			if (validEmailField && validPasswordField) {
				setIsEmptyField(false)
			} else {
				setIsEmptyField(true)
			}
		}
	}

	useEffect(() => {
		validateFields()
	}, [fieldsState])

	return {
		hasEmptyFields: isEmptyField,
	}
}
