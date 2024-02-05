import { useEffect, useState } from 'react'
import { AnimalService } from '~services/animal.services'
import {
	LocationService,
	TLocationData,
	TResponseLocationData,
	TUserLocationCoords,
} from '~services/location.services'
import { UserService } from '~services/user.services'

import { useActions } from './useActions'
import { useAuth } from './useAuth'

export type TUserLocationData = Partial<TUserLocationCoords> &
	Partial<TLocationData>

const initialLocationState =
	{
		coords: {
			latitude: 0,
			longitude: 0,
		},
		address: {
			country: '',
			stateDistrict: '',
			town: '',
			postcode: '',
		},
		displayName: '',
	} || null

export const useLocation = () => {
	const [isFetchingLocation, setIsFetchingLocation] = useState(false)
	const [locationDataUser, setLocationDataUser] = useState<TUserLocationData>(
		initialLocationState || null
	)
	const { updateUser } = useActions()
	const { user } = useAuth()

	useEffect(() => {
		checkCurrentLocation()
	}, [])

	const fetchLocation = async () => {
		try {
			setIsFetchingLocation(true)
			const coordsUser: TUserLocationCoords =
				await LocationService.getLocationCoords()

			if (!coordsUser) return

			const currPlace: TResponseLocationData =
				await LocationService.getPlaceFromCoordinates(
					coordsUser?.coords.latitude || 0,
					coordsUser?.coords.longitude || 0
				)

			if (coordsUser && currPlace) {
				setLocationDataUser(() => ({
					coords: {
						latitude: coordsUser?.coords.latitude || 0,
						longitude: coordsUser?.coords.longitude || 0,
					},
					address: {
						country: currPlace.address.country || '',
						postcode: currPlace.address.postcode || '',
						stateDistrict:
							currPlace.address.state_district || currPlace.address.state || '',
						town: currPlace.address.town || currPlace.address.city || '',
					},
					displayName: currPlace.display_name,
				}))
				// updated state user and owner field coords for animals
				if (user?.id) {
					updateUser({
						userId: user?.id,
						newData: { location: coordsUser?.coords },
					})
					const { user: userRef } = await UserService.getUserRef(user?.id)
					const animalIds = userRef.ownAnimals
					if (animalIds.length > 0) {
						await AnimalService.updateOwnerCoords(animalIds, {
							latitude: coordsUser?.coords.latitude || 0,
							longitude: coordsUser?.coords.longitude || 0,
						})
					}
				}
			} else {
				throw new Error('Error in coordUser')
			}
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
				const currLocation: TResponseLocationData =
					await LocationService.getPlaceFromCoordinates(latitude, longitude)

				if (!currLocation) {
					console.error('There are problems with user location data')
				} else {
					setLocationDataUser(() => ({
						coords: { latitude, longitude },
						address: {
							country: currLocation.address.country || '',
							postcode: currLocation.address.postcode || '',
							stateDistrict:
								currLocation.address.state_district ||
								currLocation.address.state ||
								'',
							town:
								currLocation.address.town || currLocation.address.city || '',
						},
						displayName: currLocation.display_name || '',
					}))
				}
			} else {
				fetchLocation()
			}
		} catch (error) {}
	}

	const updateLocationUser = async () => await fetchLocation()

	const resetLocationUser = () => {
		setLocationDataUser(initialLocationState)
		updateUser({
			userId: user?.id || '',
			newData: { location: { latitude: 0, longitude: 0 } },
		})
	}

	return {
		isFetchingLocation,
		locationDataUser,
		updateLocationUser,
		resetLocationUser,
	}
}
