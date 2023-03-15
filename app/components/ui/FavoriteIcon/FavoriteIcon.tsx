import Ionicons from '@expo/vector-icons/Fontisto'
import { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { COLORS } from '~constants/theme'
import { TypeColorComponents } from '~interfaces/theme.types'

interface IFavoriteIconProps {
	backgroundColorIcon?: TypeColorComponents
	colorIcon?: TypeColorComponents
	sizeIcon?: number
	widthContainer?: number
	heightContainer?: number
}

export const FavoriteIcon: FC<IFavoriteIconProps> = ({
	backgroundColorIcon = 'iconFavoriteBg',
	colorIcon = 'iconFavoriteColor',
	sizeIcon = 20,
	widthContainer = 50,
	heightContainer = 50,
}) => {
	const selectedBgColor = COLORS[backgroundColorIcon]
	const selectedColor = COLORS[colorIcon]
	return (
		<TouchableOpacity
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
