import { FC } from 'react'
import { StyleSheet } from 'react-native'
import LogoApp from '~assets/icons/logo.svg'

interface ILogo {
	logoColor: '#2B2B2E' | '#F8F8F8'
}

export const Logo: FC<ILogo> = ({ logoColor = '#000' }) => {
	return (
		<>
			<LogoApp width={100} height={20} fill={logoColor} />
		</>
	)
}

const styles = StyleSheet.create({})
