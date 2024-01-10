import { useNavigation } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spinner } from '~components/ui/Spinner/Spinner'
import { CONTAINER } from '~constants/theme'
import { ProfileNavigationComponent } from '~navigation/ProfileStackNavigator'
import { LocationService, UserLocation } from '~services/location.services'

export const LocationScreen: FC = () => {
	const [userLocation, setUserLocation] = useState<UserLocation>(null)
	const { goBack } = useNavigation<ProfileNavigationComponent>()
	const [isLoading, setIsLoading] = useState(false)

	// TESTING LOCATION SCREEN + REDUX  + DATA BASE  + TYPE ITEM

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const location = await LocationService.getLocationAsync()
				setUserLocation(location)
				console.log('start fetchLocation')
				goBack()
			} catch (error) {
				console.error('❌ ~ error:', error)
			}
		}
		if (userLocation) fetchLocation()
	}, [])

	// useEffect(() => {
	// 	if (userLocation) {
	// 		console.log('Yes coords')
	// 		// const { latitude, longitude } = userLocation.coords
	// 		// getPlaceFromCoordinates(latitude, longitude)
	// 	} else {
	// 		console.log('No coords')
	// 	}
	// }, [userLocation])

	return (
		<View style={styles.container}>
			<Spinner></Spinner>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...CONTAINER.mainContainer,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
