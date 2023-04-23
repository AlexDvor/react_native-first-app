type TypeCase = 'All Upper' | 'All Lower' | 'First Upper'

export const normalizeWords = (string: string, type: TypeCase): string => {
	switch (type) {
		case 'All Upper':
			return string.toUpperCase()

		case 'All Lower':
			return string.toLowerCase()

		case 'First Upper':
			return string
				.split(' ')
				.map(
					(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				)
				.toString()

		default:
			return 'Invalid  normalizeWords  type'
	}
}
