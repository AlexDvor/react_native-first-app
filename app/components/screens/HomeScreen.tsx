import Ionicons from '@expo/vector-icons/Ionicons'
import { Gallery } from 'components/ui/Gallery/Gallery'
import { Logo } from 'components/ui/Logo'
import { COLORS } from 'constants/theme'
import { useState } from 'react'
import { FC } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { dataAnimals } from '../../data/animals'

export const HomeScreen: FC = () => {
	const [hasNotification, setHasNotification] = useState(true)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Logo logoColor={'#2B2B2E'} />

					<View>
						<View style={styles.iconWrapper}>
							<Ionicons name="notifications-outline" size={32} color="black" />
						</View>

						{hasNotification && (
							<View style={styles.notificationWrapper}>
								<View style={styles.notificationDot}></View>
							</View>
						)}
					</View>
				</View>

				<Gallery items={dataAnimals}></Gallery>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		marginTop: 80,
		borderWidth: 2,
	},
	headerContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderWidth: 2,
	},
	iconWrapper: {
		position: 'relative',
	},
	notificationWrapper: {
		position: 'absolute',
		top: 2,
		right: 4,
		width: 12,
		height: 12,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.notificationBackgroundColor,
		borderRadius: 50,
	},
	notificationDot: {
		width: 8,
		height: 8,
		backgroundColor: COLORS.notificationDotColor,
		borderRadius: 50,
	},
})
