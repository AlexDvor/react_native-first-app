import Ionicons from '@expo/vector-icons/Ionicons'
import { FC, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
import { Logo } from '~components/ui/Logo/Logo'
import { ScrollableMenuList } from '~components/ui/ScrollableMenu/ScrollableMenuList'
import { menuData } from '~components/ui/ScrollableMenu/menu.data'
import { COLORS, CONTAINER } from '~constants/theme'
import { useAuth } from '~hooks/useAuth'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

import { DefaultHomeProps } from '../../../interfaces/home.navigation.types'

export const HomeScreen: FC<DefaultHomeProps> = ({
	route,
	navigation,
}: DefaultHomeProps) => {
	const [hasNotification, setHasNotification] = useState(true)
	const [allCollection, setAllCollection] = useState<IAnimalsData[]>([])
	const [favoriteIdList, setFavoriteIdList] = useState<null | string[]>(null)
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()

	const handleOnPressTypeMenu = () => {}
	const handleOnPressItem = () => {}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			const fetchCollection = async () => {
				if (!user?.id) return
				try {
					setIsLoading(true)
					const allCollection = await UserService.getAllCollection()
					const idFavoriteList = await UserService.getFavoriteListIds(user?.id)
					setFavoriteIdList(idFavoriteList)
					if (allCollection) {
						setAllCollection(allCollection)
					}
				} catch (error) {
					setAllCollection([])
				} finally {
					setIsLoading(false)
				}
			}
			fetchCollection()
		})

		return unsubscribe
	}, [])

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
				<ScrollableMenuList menu={menuData} />

				<View style={styles.galleryWrapper}>
					<Gallery
						items={allCollection}
						navigateTo="AnimalProfileScreen"
						favoriteListId={favoriteIdList}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...CONTAINER.mainContainer,
	},
	headerContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
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

	galleryWrapper: {
		flex: 1,
		alignItems: 'center',
	},
})
