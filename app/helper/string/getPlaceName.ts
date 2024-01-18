import { TUserLocationData } from '~hooks/useLocation'

export const getPlaceName = (data: TUserLocationData) => {
	const currLocation = `${data?.address?.stateDistrict}, ${data?.address?.town}`
	if (currLocation.length >= 6) {
		return currLocation
	} else {
		return 'Null'
	}
}
