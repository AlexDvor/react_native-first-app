import * as Location from 'expo-location'

export type TUserLocationCoords = {
	coords: {
		latitude: number
		longitude: number
	}
} | null

export type TAddress = {
	stateDistrict: string
	town: string
	postcode: string
	country: string
}

export type TResponseAddress = {
	state_district: string
	town: string
	postcode: string
	country: string
	state?: string
	city?: string
}

export type TResponseLocationData = {
	address: TResponseAddress
	display_name: string
} | null

export type TLocationData = {
	address: TAddress
	displayName: string
}

export const LocationService = {
	async getLocationCoords(): Promise<TUserLocationCoords | null> {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			console.log('Permission to access location was denied')
			return null
		}
		try {
			const location = await Location.getCurrentPositionAsync()
			return location
		} catch (error) {
			console.error('Error getting user location:', error)
			return null
		}
	},

	async getPlaceFromCoordinates(
		latitude: number,
		longitude: number
	): Promise<TResponseLocationData | null> {
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
			)
			const data = await response.json()
			return data as TResponseLocationData
		} catch (error) {
			console.error('Error getting place from coordinates:', error)
			return null
		}
	},
}
