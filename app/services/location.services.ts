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

interface Coordinates {
	latitude: number
	longitude: number
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

	formatDistance(distance: number): string {
		if (distance < 1) {
			return `${(distance * 1000).toFixed(1)} м`
		} else {
			return `${distance.toFixed(1)} км`
		}
	},

	degreesToRadians(degrees: number): number {
		return degrees * (Math.PI / 180)
	},

	calculateDistance(coord1: Coordinates, coord2: Coordinates): string {
		const earthRadiusKm = 6371

		const dLat = this.degreesToRadians(coord2.latitude - coord1.latitude)
		const dLon = this.degreesToRadians(coord2.longitude - coord1.longitude)

		const lat1 = this.degreesToRadians(coord1.latitude)
		const lat2 = this.degreesToRadians(coord2.latitude)

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

		const distance = earthRadiusKm * c

		return this.formatDistance(distance)
	},
}
