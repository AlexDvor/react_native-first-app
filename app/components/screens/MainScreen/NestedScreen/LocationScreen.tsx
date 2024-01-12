import { useNavigation } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spinner } from '~components/ui/Spinner/Spinner'
import { CONTAINER } from '~constants/theme'
import { useLocation } from '~hooks/useLocation'
import { ProfileNavigationComponent } from '~navigation/ProfileStackNavigator'

export const LocationScreen: FC = () => {
	const { isFetchingLocation, locationDataUser } = useLocation()
	const { goBack } = useNavigation<ProfileNavigationComponent>()

	useEffect(() => {
		if (locationDataUser) {
			goBack()
		}
	}, [locationDataUser])

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
