import { FC, useState } from 'react'
import {
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TextInputAndroidProps,
	View,
} from 'react-native'
import { BackgroundAuthLayout } from '~components/layout/BackgroundAuthLayout'
import FormButton from '~components/ui/FormButton/FormButton'
import FormInput from '~components/ui/FormInput/FormInput'
import { Logo } from '~components/ui/Logo/Logo'
import { PrimaryButton } from '~components/ui/PrimaryButton/PrimaryButton'
import { FONTS } from '~constants/theme'

export const RegisterScreen: FC = () => {
	const [name, setName] = useState('dfgdfg')
	const [email, setEmail] = useState('dfgdfg')
	const [password, setPassword] = useState('fdgdfg')
	return (
		<>
			<BackgroundAuthLayout>
				<FormInput
					value={name}
					iconType="user"
					// onChangeText={(userEmail) => setEmail(userEmail)}
					placeholder="Name"
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<FormInput
					iconType="email"
					value={email}
					// onChangeText={(userEmail) => setEmail(userEmail)}
					placeholder="Email"
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
				/>

				<FormInput
					value={password}
					// onChangeText={(userPassword) => setPassword(userPassword)}
					placeholder="Password"
					iconType="lock"
					secureTextEntry={true}
				/>

				<FormButton buttonTitle="Sing Up" />
			</BackgroundAuthLayout>
		</>
	)
}

const styles = StyleSheet.create({})
