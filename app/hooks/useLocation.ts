import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { LocationService, TUserLocation } from '~services/location.services'

import { useActions } from './useActions'
import { useAuth } from './useAuth'

export const useLocation = () => {
	const [isFetchingLocation, setIsFetchingLocation] = useState(false)
	const [userLocation, setUserLocation] = useState<TUserLocation>(null)
	const { updateUser } = useActions()
	const { user } = useAuth()

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				setIsFetchingLocation(true)
				const coordsUser: TUserLocation =
					await LocationService.getLocationAsync()
				setUserLocation(coordsUser)
				updateUser({
					userId: user?.id || '',
					newData: { location: coordsUser?.coords },
				})
			} catch (error) {
				console.error('❌ ~ useLocation:', error)
			} finally {
				setIsFetchingLocation(false)
			}
		}

		const checkCurrentLocation = async () => {
			try {
				if (user?.location) {
					const { latitude, longitude } = user.location
					const currLocation = await LocationService.getPlaceFromCoordinates(
						latitude,
						longitude
					)

					if ('error' in currLocation) {
						console.error('There are problems with user location data')
					} else {
						setUserLocation({ coords: { latitude, longitude } })
						Alert.alert(`Your current location is ${currLocation.display_name}`)
					}
				} else {
					console.log('fetch ubi')
					fetchLocation()
				}
			} catch (error) {}
		}

		checkCurrentLocation()
	}, [])

	return {
		isFetchingLocation,
		userLocation,
	}
}
