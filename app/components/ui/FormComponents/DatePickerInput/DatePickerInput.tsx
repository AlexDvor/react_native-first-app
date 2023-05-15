import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { COLORS } from '~constants/theme'
import { TFormState } from '~interfaces/form.state.types'

interface DatePickerInputProps {
	formState: React.Dispatch<React.SetStateAction<TFormState>>
	dateName: string
	resetPicker: boolean
	setResetPicker: React.Dispatch<React.SetStateAction<boolean>>
}

export const DatePickerInput: FC<DatePickerInputProps> = ({
	formState,
	dateName,
	resetPicker,
	setResetPicker,
}) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [isDatePickerVisible, setDatePickerVisibility] =
		useState<boolean>(false)
	const [resetDateTimePickerLocal, setResetDateTimePickerLocal] =
		useState<boolean>(false)

	useEffect(() => {
		if (resetPicker) {
			setSelectedDate(null)
			setResetDateTimePickerLocal(true)
			setResetPicker(false)
		} else {
			setResetDateTimePickerLocal(false)
		}
	}, [resetPicker])

	const showDatePicker = () => {
		setDatePickerVisibility(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
	}

	const handleConfirm = (date: Date) => {
		const selectedYear = date.getFullYear()
		const selectedMonth = date.getMonth()
		const selectedDay = date.getDate()

		setSelectedDate(date)
		formState((prev) => ({
			...prev,
			[dateName]: {
				year: selectedYear,
				month: selectedMonth,
				day: selectedDay,
			},
		}))
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
				key={resetDateTimePickerLocal ? 'resetDateTimePickerLocal' : ''}
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
