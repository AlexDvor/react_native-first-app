import * as Location from 'expo-location'

export type UserLocation = {
	coords: {
		latitude: number
		longitude: number
	}
} | null

type LocationData = {
	address: {
		country: string
		city: string
	}
	display_name: string
}

type ErrorResponse = {
	error: unknown
}

type ResponseData = LocationData | ErrorResponse

export const LocationService = {
	async getLocationAsync(): Promise<UserLocation | null> {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			console.log('Permission to access location was denied')
			return null
		}
		try {
			const location = await Location.getCurrentPositionAsync({})
			return location
		} catch (error) {
			console.error('Error getting user location:', error)
			return null
		}
	},

	async getPlaceFromCoordinates(
		latitude: number,
		longitude: number
	): Promise<ResponseData> {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
			)
			const data = await response.json()
			if ('error' in data) {
				return data as ErrorResponse
			}
			return data as LocationData
		} catch (error) {
			console.error('Error getting place from coordinates:', error)
			return { error }
		}
	},
}
