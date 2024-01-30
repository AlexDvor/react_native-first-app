import { Coordinates, LocationService } from '~services/location.services'

export const getLocationInfo = async (coords: Coordinates) => {
	const location = await LocationService.getPlaceFromCoordinates(
		coords.latitude,
		coords.longitude
	)

	if (location) {
		const place = {
			district: location?.address.state_district || location?.address.city,
			town: location?.address.town || location?.address.state,
		}
		return `${place.district}, ${place.town}`
	} else {
		return 'Error in locationOwner'
	}
}
