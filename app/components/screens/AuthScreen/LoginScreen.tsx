import { useNavigation } from '@react-navigation/native'
import { FC, useState } from 'react'
import {
	Keyboard,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { BackgroundAuthLayout } from '~components/layout/BackgroundAuthLayout'
import FormButton from '~components/ui/FormComponents/FormButton/FormButton'
import FormInput from '~components/ui/FormComponents/FormInput/FormInput'
import { Logo } from '~components/ui/Logo/Logo'
import { useActions } from '~hooks/useActions'
import { useAuth } from '~hooks/useAuth'
import { useKeyboardVisible } from '~hooks/useKeyboardVisible'
import { useValidateFields } from '~hooks/useValidateFields'
import { AuthNavigationComponent } from '~interfaces/auth.navigation.types'

export const LoginScreen: FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { isLoading, error } = useAuth()
	const { login, resetError } = useActions()
	const { isShowKeyBoard } = useKeyboardVisible()
	const { hasEmptyFields } = useValidateFields('login', { email, password })
	const { navigate } = useNavigation<AuthNavigationComponent>()

	const keyBoardHide = () => {
		handleResetError()
		Keyboard.dismiss()
	}

	const handleResetError = () => {
		if (error) resetError()
	}

	return (
		<>
			<BackgroundAuthLayout>
				<TouchableWithoutFeedback onPress={keyBoardHide}>
					<View style={styles.container}>
						<View style={styles.logoWrapper}>
							<Logo logoColor={'#F8F8F8'} />
						</View>

						<View style={styles.formWrapper}>
							<FormInput
								iconType="email"
								value={email}
								placeholder="Email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={(userEmail) => setEmail(userEmail)}
								onFocus={handleResetError}
							/>

							<FormInput
								value={password}
								placeholder="Password"
								iconType="lock"
								secureTextEntry={true}
								onChangeText={(userPassword) => setPassword(userPassword)}
								onFocus={handleResetError}
							/>

							<View style={styles.buttonWrapper}>
								<FormButton
									title="Sign In"
									onPress={() => {
										keyBoardHide()
										login({ email, password })
									}}
									isFetching={isLoading}
									disabled={hasEmptyFields}
								/>
								<View style={styles.signInContainer}>
									<Text style={[styles.textLink]}>Don't have an account?</Text>
									<TouchableOpacity onPress={() => navigate('SignUp')}>
										<Text style={[styles.textLink, styles.link]}>Sign Up</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						{error && (
							<View style={styles.errorWrapper}>
								<Text style={styles.errorMessage}>{error}</Text>
							</View>
						)}

						{!isShowKeyBoard && (
							<Text style={styles.text}>
								Happiness is closer than you think
							</Text>
						)}
					</View>
				</TouchableWithoutFeedback>
			</BackgroundAuthLayout>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginHorizontal: 20,
		flex: 1,
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
		justifyContent: 'space-between',
	},

	logoWrapper: {
		marginTop: 20,
		width: '100%',
	},

	errorWrapper: {
		position: 'absolute',
		top: 170,
		left: 0,
		right: 0,
	},

	errorMessage: {
		fontSize: 15,
		textAlign: 'center',
		color: '#c44537',
	},

	formWrapper: {
		width: '100%',
	},

	text: {
		fontSize: 18,
		color: '#ededed',
		textAlign: 'center',
		marginBottom: 30,
	},

	buttonWrapper: {
		marginTop: 10,
	},

	signInContainer: {
		flexDirection: 'row',
		marginTop: 25,
		marginBottom: 25,
		justifyContent: 'center',
	},

	textLink: {
		fontSize: 14,
		color: '#ededed',
	},

	link: {
		color: '#F2968F',
		marginLeft: 15,
	},
})
