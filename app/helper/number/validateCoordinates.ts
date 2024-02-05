type TValidateCoordinates = {
	longitude?: number
	latitude?: number
}

export const validateCoordinates = (coords: TValidateCoordinates) => {
	if (
		!coords ||
		coords.longitude === undefined ||
		coords.latitude === undefined
	) {
		console.log('Error: Invalid coordinates object')
		return null
	}

	if (coords.longitude !== 0 && coords.latitude !== 0) {
		return {
			longitude: coords.longitude,
			latitude: coords.latitude,
		}
	} else {
		console.log('Error: Invalid or missing coordinates values')
		return null
	}
}