import LogoApp from 'assets/icons/logo.svg'
import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface ILogo {
	logoColor: '#2B2B2E' | '#F8F8F8'
}

export const Logo: FC<ILogo> = ({ logoColor = '#000' }) => {
	return (
		<>
			<LogoApp width={100} height={35} fill={logoColor} />
		</>
	)
}

const styles = StyleSheet.create({})
