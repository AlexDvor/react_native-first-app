import Ionicons from '@expo/vector-icons/Fontisto'
import { FC, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '~constants/theme'
import { useAuth } from '~hooks/useAuth'
import { TypeColorComponents } from '~interfaces/theme.types'
import { CollectionServices } from '~services/coll.services'
import { UserService } from '~services/user.services'

interface IFavoriteIconProps {
	backgroundColorIcon?: TypeColorComponents
	colorIcon?: TypeColorComponents
	sizeIcon?: number
	widthContainer?: number
	heightContainer?: number
	itemId: string
}

export const FavoriteIcon: FC<IFavoriteIconProps> = ({
	backgroundColorIcon = 'iconFavoriteBg',
	colorIcon = 'iconFavoriteColor',
	sizeIcon = 20,
	widthContainer = 50,
	heightContainer = 50,
	itemId,
}) => {
	const [isFavorite, setFavorite] = useState(false)
	const { user } = useAuth()
	const selectedBgColor = COLORS[backgroundColorIcon]
	const selectedColor = COLORS[colorIcon]

	const handleTouch = async () => {
		if (!user?.id) return
		try {
			await CollectionServices.toggleFavoriteList(itemId, user.id)
			setFavorite(!isFavorite)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const fetchFavoriteList = async () => {
			if (!user?.id) return
			try {
				const idList = await UserService.getUserRef(user.id)
				const isFavoriteItem = idList.user.favorites.some(
					(id: string) => id === itemId
				)
				setFavorite(isFavoriteItem)
			} catch (error) {
				console.log('fetchFavoriteList:', error)
			}
		}
		fetchFavoriteList()
	}, [itemId])

	return (
		<TouchableOpacity
			onPress={handleTouch}
			style={{
				width: widthContainer,
				height: heightContainer,
				backgroundColor: selectedBgColor,
				borderRadius: 50,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{isFavorite ? (
				<Ionicons name="heart" size={sizeIcon} color={selectedColor} />
			) : (
				<Ionicons name="heart-alt" size={sizeIcon} color={selectedColor} />
			)}
		</TouchableOpacity>
	)
}
