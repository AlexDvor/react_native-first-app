import { FC, useRef, useState } from 'react'
import {
	Animated,
	FlatList,
	ImageSourcePropType,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
} from 'react-native'

import { PaginationIndicator } from './PaginationIndicator'
import { SliderItem } from './SliderItem'

interface ISliderProps {
	imageData: { image: ImageSourcePropType }[]
}

export const Slider: FC<ISliderProps> = ({ imageData }) => {
	const [index, setIndex] = useState(0)
	const scrollX = useRef(new Animated.Value(0)).current

	const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		event.persist()
		Animated.event(
			[
				{
					nativeEvent: {
						contentOffset: { x: scrollX },
					},
				},
			],
			{ useNativeDriver: false }
		)(event)
	}

	const handleOnViewableItemsChange = useRef(({ viewableItems }: any) => {
		setIndex(viewableItems[0].index)
	}).current

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current

	return (
		<>
			{imageData.length === 1 ? (
				<>
					<SliderItem image={imageData[0].image} />
				</>
			) : (
				<>
					<FlatList
						data={imageData}
						pagingEnabled
						snapToAlignment="center"
						horizontal
						keyExtractor={(_, index) => String(index)}
						showsHorizontalScrollIndicator={false}
						onScroll={handleOnScroll}
						onViewableItemsChanged={handleOnViewableItemsChange}
						viewabilityConfig={viewabilityConfig}
						renderItem={({ item }) => <SliderItem image={item.image} />}
					/>

					<PaginationIndicator
						data={imageData}
						scrollX={scrollX}
						index={index}
					/>
				</>
			)}
		</>
	)
}

const styles = StyleSheet.create({})
