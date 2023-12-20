import Ionicons from '@expo/vector-icons/Ionicons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { FC, useCallback, useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Gallery } from '~components/ui/Gallery/Gallery'
import { Logo } from '~components/ui/Logo/Logo'
import { ScrollableMenuList } from '~components/ui/ScrollableMenu/ScrollableMenuList'
import { menuData } from '~components/ui/ScrollableMenu/menu.data'
import { COLORS, CONTAINER } from '~constants/theme'
import { useAuth } from '~hooks/useAuth'
import { usePaginatedCollection } from '~hooks/usePaginatedCollection'
import { UserService } from '~services/user.services'

import {
	DefaultHomeProps,
	TNavigationComponent,
} from '../../../interfaces/home.navigation.types'

export type TSelectedAnimalType = 'All' | 'Dog' | 'Cat'

export const HomeScreen: FC<DefaultHomeProps> = () => {
	const [favoriteIdList, setFavoriteIdList] = useState<null | string[]>(null)
	const [selectedAnimalType, setSelectedAnimalType] =
		useState<TSelectedAnimalType>('All')
	const [hasNotify, setHasNotify] = useState(false)
	const { user } = useAuth()
	const { navigate } = useNavigation<TNavigationComponent>()

	const { animals, isFetching, isPaginationLoading, loadMoreAnimals } =
		usePaginatedCollection(selectedAnimalType)

	const handleOnPressTypeMenu = (animalType: TSelectedAnimalType) => {
		setSelectedAnimalType(animalType)
	}

	// useFocusEffect(
	// 	useCallback(() => {
	// 		const fetchCollection = async () => {
	// 			if (!user?.id) return
	// 			try {
	// 				setIsLoading(true)
	// 				const allCollection = await UserService.getCollection(
	// 					selectedAnimalType
	// 				)
	// 				const idFavoriteList = await UserService.getFavoriteIdList(user?.id)
	// 				setFavoriteIdList(idFavoriteList)
	// 				if (allCollection) {
	// 					setAllCollection(allCollection)
	// 				}
	// 			} catch (error) {
	// 				setAllCollection([])
	// 			} finally {
	// 				setIsLoading(false)
	// 			}
	// 		}
	// 		fetchCollection()
	// 	}, [selectedAnimalType])
	// )

	useFocusEffect(
		useCallback(() => {
			const fetchNotify = async () => {
				if (!user?.id) return

				try {
					const userData = await UserService.getUserRef(user?.id)
					const notifyColl = userData.user.notifications
					const favorIdList = userData.user.favorites
					const hasUnreadMessages = notifyColl.some(
						(notify) => notify.read === false
					)
					setHasNotify(hasUnreadMessages)
					setFavoriteIdList(favorIdList)
				} catch (error) {
				} finally {
				}
			}
			fetchNotify()
		}, [selectedAnimalType])
	)

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Logo logoColor={'#2B2B2E'} />

					<TouchableOpacity onPress={() => navigate('NotificationScreen')}>
						<View style={styles.iconWrapper}>
							<Ionicons name="notifications-outline" size={32} color="black" />
						</View>

						{hasNotify && (
							<View style={styles.notificationWrapper}>
								<View style={styles.notificationDot}></View>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<ScrollableMenuList
					menu={menuData}
					onPressTypeMenu={handleOnPressTypeMenu}
					selectedAnimalType={selectedAnimalType}
				/>
				{/* <View>
					<Text style={{ textAlign: 'center', color: 'red' }}>
						{'TEST OPTIONS'}
					</Text>
					<Text>{`Total items : ${animals.length || undefined} `}</Text>
					<Text>{`Total Pages :${totalPage || undefined} `}</Text>
					<Text>{`Current Page :${currentPage || undefined} `}</Text>
				</View> */}

				<View style={styles.galleryWrapper}>
					<Gallery
						items={animals}
						navigateTo="AnimalProfileScreen"
						hasPagination={true}
						favoriteListId={favoriteIdList}
						isLoading={isFetching}
						onLoadMore={loadMoreAnimals}
						isPaginationLoading={isPaginationLoading}
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
