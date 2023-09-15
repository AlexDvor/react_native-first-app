import { format } from 'date-fns'

export function getFormattedTime(dateString: string) {
	const dateObject = new Date(dateString)
	return format(dateObject, 'HH:mm')
}
