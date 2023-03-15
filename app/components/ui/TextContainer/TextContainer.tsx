import { FC, useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import { TextStyle } from 'react-native'

interface ITextContainer {
	text: string
	numberOfLines: number
	textStyle: TextStyle
}

export const TextContainer: FC<ITextContainer> = ({
	text,
	numberOfLines,
	textStyle,
}) => {
	const [textShown, setTextShown] = useState(false)
	const [lengthMore, setLengthMore] = useState(false)
	const toggleNumberOfLines = () => {
		setTextShown(!textShown)
	}

	const onTextLayout = useCallback(
		(e: { nativeEvent: { lines: string | any[] } }) => {
			setLengthMore(e.nativeEvent.lines.length >= numberOfLines + 1)
		},
		[]
	)

	return (
		<View>
			<Text
				onTextLayout={onTextLayout}
				numberOfLines={textShown ? undefined : numberOfLines}
				style={textStyle}
			>
				{text}
			</Text>

			{lengthMore ? (
				<Text
					onPress={toggleNumberOfLines}
					style={{ lineHeight: 21, marginTop: 1 }}
				>
					{textShown ? 'Read less...' : 'Read more...'}
				</Text>
			) : null}
		</View>
	)
}
