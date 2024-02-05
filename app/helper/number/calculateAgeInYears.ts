import { differenceInMonths, differenceInYears } from 'date-fns'

export default function calculateAge(
	day: number,
	month: number,
	year: number
): string {
	const currentDate: Date = new Date()
	const userDate: Date = new Date(year, month - 1, day)

	const diffInMonths: number = differenceInMonths(currentDate, userDate)
	const diffInYears: number = differenceInYears(currentDate, userDate)
	const remainingMonths: number = diffInMonths % 12

	const formattedAge: string = `${diffInYears}.${remainingMonths}`

	return formattedAge
}
