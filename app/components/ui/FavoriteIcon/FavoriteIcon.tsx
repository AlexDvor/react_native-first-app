import Ionicons from '@expo/vector-icons/Fontisto'
import { FC, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '~constants/theme'
import { TypeColorComponents } from '~interfaces/theme.types'
import { UserService } from '~services/user/user.services'

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
	const selectedBgColor = COLORS[backgroundColorIcon]
	const selectedColor = COLORS[colorIcon]

	const handleTouch = async () => {
		try {
			await UserService.toggleFavoriteList(itemId)
			setFavorite(!isFavorite)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const fetchFavoriteList = async () => {
			try {
				const idList = await UserService.getFavoriteListIds()
				const response = idList.some((id: string) => id === itemId)

				if (response) {
					setFavorite(true)
				}
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
