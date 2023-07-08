import Ionicons from '@expo/vector-icons/Fontisto'
import { FC } from 'react'
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
	const selectedBgColor = COLORS[backgroundColorIcon]
	const selectedColor = COLORS[colorIcon]

	const handleTouch = async () => {
		try {
			await UserService.addOFavoriteItemToProfile({ favorite: [itemId] })
		} catch (error) {
			console.log(error)
		}
	}
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
			<Ionicons name="heart-alt" size={sizeIcon} color={selectedColor} />
		</TouchableOpacity>
	)
}
