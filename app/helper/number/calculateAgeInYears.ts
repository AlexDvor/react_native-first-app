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

// import { differenceInMonths, differenceInYears } from 'date-fns'
// function formatDuration(value: number, unit: string): string {
// 	if (value === 1) {
// 		return `${value} ${unit}`
// 	} else {
// 		return `${value} ${unit}s`
// 	}
// }
// export default function calculateAge(
// 	day: number,
// 	month: number,
// 	year: number
// ): string {
// 	const currentDate: Date = new Date()
// 	const userDate: Date = new Date(year, month - 1, day)
// 	const diffInMonths: number = differenceInMonths(currentDate, userDate)
// 	const diffInYears: number = differenceInYears(currentDate, userDate)
// 	const formattedDiffInYears: string = formatDuration(diffInYears, 'year')
// 	const formattedDiffInMonths: string = formatDuration(
// 		diffInMonths % 12,
// 		'month'
// 	)
// 	if (diffInYears === 0) {
// 		return formattedDiffInMonths
// 	} else if (diffInMonths % 12 === 0) {
// 		return formattedDiffInYears
// 	} else {
// 		return `${formattedDiffInYears} ${formattedDiffInMonths}`
// 	}
// }
