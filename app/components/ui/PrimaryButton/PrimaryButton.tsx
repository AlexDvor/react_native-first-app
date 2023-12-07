import { FC } from 'react'
import { ButtonProps, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '~constants/theme'
import { TypeColorComponents } from '~interfaces/theme.types'

import { Loader } from '../Loader/Loader'

interface IPrimaryBtn extends ButtonProps {
	widthButton?: number
	backgroundColorButton?: TypeColorComponents
	title: string
	margLeft?: number
	margRight?: number
	isFetching?: boolean
}

export const PrimaryButton: FC<IPrimaryBtn> = ({
	title,
	widthButton,
	backgroundColorButton = 'primaryBtn',
	margLeft = 0,
	margRight = 0,
	isFetching = false,
	disabled,
	...rest
}) => {
	const selectedColor = COLORS[backgroundColorButton]

	return (
		<TouchableOpacity
			disabled={disabled || isFetching}
			style={{
				backgroundColor: disabled ? COLORS.disableBackgroundBtn : selectedColor,
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
			{isFetching ? (
				<Loader />
			) : (
				<Text
					style={{
						color: COLORS.primaryTextColorBtn,
						...FONTS.buttonPrimaryFonts,
					}}
				>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	)
}
