import { FC, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { COLORS, FONTS } from '~constants/theme'
import { TFormState } from '~interfaces/form.state.types'

type ListProps = {
	id?: number
	name: string
}

interface SelectPickerProps {
	listOption: ListProps[]
	formState: React.Dispatch<React.SetStateAction<TFormState>>
	placeholderText: string
	nameInput: string
	isDisabled?: boolean
	resetPicker: boolean
	setResetPicker: React.Dispatch<React.SetStateAction<boolean>>
}

const pickerStyle = {
	inputAndroid: {
		...FONTS.inputFont,
		color: 'black',
	},
	placeholder: {
		color: COLORS.placeholderTextColor,
	},
}

export const SelectPicker: FC<SelectPickerProps> = ({
	listOption,
	formState,
	placeholderText = 'Select value',
	nameInput,
	isDisabled,
	resetPicker,
	setResetPicker,
}) => {
	const [selectedValue, setSelectedValue] = useState<string | null>(null)
	const [resetPickerLocal, setResetPickerLocal] = useState<boolean>(false)

	useEffect(() => {
		if (resetPicker) {
			setSelectedValue(null)
			setResetPickerLocal(true)
			setResetPicker(false)
		} else {
			setResetPickerLocal(false)
		}
	}, [resetPicker])

	const data = () =>
		listOption.map((item) => ({
			label: item.name,
			value: item.name,
		}))

	return (
		<View style={styles.selectItem}>
			<RNPickerSelect
				useNativeAndroidPickerStyle={false}
				value={selectedValue}
				disabled={isDisabled}
				items={data()}
				onValueChange={(value) => {
					formState((prev) => ({ ...prev, [nameInput]: value }))
					setSelectedValue(value)
				}}
				placeholder={{
					label: placeholderText,
					value: null,
					color: COLORS.placeholderTextColor,
				}}
				style={pickerStyle}
				key={resetPickerLocal ? 'resetPickerLocal' : ''}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	selectItem: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.midGray,
		marginBottom: 15,
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 5,
	},
})
