import { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { COLORS } from '~constants/theme'
import { TFormState } from '~interfaces/form.state.types'

interface DatePickerInputProps {
	formState: React.Dispatch<React.SetStateAction<TFormState>>
	dateName: string
}

export const DatePickerInput: FC<DatePickerInputProps> = ({
	formState,
	dateName,
}) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

	const showDatePicker = () => {
		setDatePickerVisibility(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
	}

	const handleConfirm = (date: Date) => {
		setSelectedDate(date)
		formState((prev) => ({ ...prev, [dateName]: date }))
		hideDatePicker()
	}

	return (
		<TouchableOpacity style={styles.item} onPress={showDatePicker}>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
				display="spinner"
			/>
			<Text
				style={{
					fontSize: 15,
					color: !selectedDate ? COLORS.placeholderTextColor : 'black',
				}}
			>
				{selectedDate
					? selectedDate.toLocaleDateString()
					: 'Select please date of birthday'}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	item: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.midGray,
		marginBottom: 15,
		padding: 15,
	},
})
