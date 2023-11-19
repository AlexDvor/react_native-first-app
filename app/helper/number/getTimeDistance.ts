import { formatDistanceToNow } from 'date-fns'

export type TGetDistance = {
	nanoseconds: number
	seconds: number
}

export const getTimeDistance = (dataTime: TGetDistance) => {
	if (dataTime !== null && typeof dataTime === 'object') {
		const sendDateMilliseconds = dataTime.seconds * 1000
		const sendDateAsDate = new Date(sendDateMilliseconds)
		const messageTimeDistance = formatDistanceToNow(sendDateAsDate, {
			addSuffix: false,
		})
		return messageTimeDistance
	}

	return 'Invalid dataTime object'
}
