import { FC } from 'react'
import { ButtonProps, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '~constants/theme'
import { TypeColorComponents } from '~interfaces/theme.types'

interface IPrimaryBtn extends ButtonProps {
	widthButton?: number
	backgroundColorButton?: TypeColorComponents
	title: string
	margLeft?: number
	margRight?: number
}

export const PrimaryButton: FC<IPrimaryBtn> = ({
	title,
	widthButton,
	backgroundColorButton = 'primaryBtn',
	margLeft = 0,
	margRight = 0,
	...rest
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
				marginLeft: margLeft,
				marginRight: margRight,
			}}
			{...rest}
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
