import { IAnimalsData } from '~interfaces/animals.types'
import { TSenderData } from '~services/user/notification.services'

export const NotificationTemplateMessages = {
	getOfferMessage(
		user: TSenderData,
		animal: IAnimalsData,
		idNotification: string
	) {
		const title = `Request to Adopt ${animal.name}`
		const text = `User ${user.name} wants to adopt your animal ${animal.name}. Please check and accept the request if you agree. Request id - ${idNotification}`
		return {
			title,
			text,
		}
	},

	getRequestConfirmationMessage(animal: IAnimalsData, idNotification: string) {
		const title = `Request to Adopt ${animal.name}`
		const text = `"Your request has been successfully sent. Please await a response from the animal's owner. Thank you for your interest! Request id - ${idNotification}`
		return {
			title,
			text,
		}
	},

	getConfirmationMessage() {
		const title = 'Action Confirmation'
		const text = `Your action has been successfully confirmed. Thank you for your participation and cooperation!`
		return {
			title,
			text,
		}
	},
}
