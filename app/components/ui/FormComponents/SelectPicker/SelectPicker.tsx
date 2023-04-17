import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { COLORS } from '~constants/theme'

type AnimalData = {
	id?: number
	name: string
}

interface SelectPickerProps {
	listOption: AnimalData[]
	formState: React.Dispatch<React.SetStateAction<{}>>
	placeholderText: string
	nameInput: string
	isDisabled: boolean
}

export const SelectPicker: FC<SelectPickerProps> = ({
	listOption,
	formState,
	placeholderText = 'Select value',
	nameInput,
	isDisabled,
}) => {
	const data = () =>
		listOption.map((item) => ({ label: item.name, value: item.name }))

	return (
		<View style={styles.selectItem}>
			<RNPickerSelect
				disabled={isDisabled}
				placeholder={{ label: placeholderText, value: null }}
				onValueChange={(value) => {
					formState((prev) => ({ ...prev, [nameInput]: value }))
				}}
				items={data()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	selectItem: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.midGray,
		marginBottom: 15,
	},
})
