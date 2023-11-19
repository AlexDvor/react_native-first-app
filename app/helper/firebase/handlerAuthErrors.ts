export interface IHandlerAuthErrors {
	code: string
}

export const handlerAuthErrors = (error: IHandlerAuthErrors) => {
	const { code } = error

	let message = ''

	switch (code) {
		case 'auth/user-not-found':
			message = 'Incorrect login or password. Please try again.'
			break

		case 'auth/wrong-password':
			message = 'Incorrect login or password. Please try again.'
			break

		case 'auth/invalid-email':
			message = 'Invalid email address. Please check the format and try again.'
			break

		case 'auth/weak-password':
			message =
				'Password is too simple. Ensure the security of your account by using a more complex password.'
			break

		case 'auth/email-already-in-use':
			message = 'This email address is already registered in our system.'
			break

		default:
			message = error.code
			break
	}

	return message
}
