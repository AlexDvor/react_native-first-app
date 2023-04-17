import { FC, useState } from 'react'
import { Button, StyleSheet } from 'react-native'
import DatePicker from 'react-native-date-picker'

export const DatePickerInput: FC = () => {
	const [date, setDate] = useState(new Date())
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button title="Open" onPress={() => setOpen(true)} />
			<DatePicker
				modal
				open={open}
				date={date}
				onConfirm={(date) => {
					setOpen(false)
					setDate(date)
				}}
				onCancel={() => {
					setOpen(false)
				}}
			/>
		</>
	)
}

const styles = StyleSheet.create({})
