import { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '~constants/theme'
import { TypeColorComponents } from '~interfaces/theme.types'

interface IPrimaryBtn {
	widthButton?: number
	backgroundColorButton?: TypeColorComponents
	title: string
	onPress?: () => void
}

export const PrimaryButton: FC<IPrimaryBtn> = ({
	title,
	widthButton,
	backgroundColorButton = 'primaryBtn',
}) => {
	const selectedColor = COLORS[backgroundColorButton]

	return (
		<TouchableOpacity
			style={{
				backgroundColor: selectedColor,
				height: 50,
				borderRadius: 30,
				justifyContent: 'center',
				alignItems: 'center',
				width: widthButton,
			}}
		>
			<Text
				style={{
					color: COLORS.primaryTextColorBtn,
					...FONTS.buttonPrimaryFonts,
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
