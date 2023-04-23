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
import { normalizeWords } from '~helper/string/normalizeWords'
import { useAuth } from '~hooks/useAuth'
import { useKeyboardVisible } from '~hooks/useKeyboardVisible'
import { AuthNavigationComponent } from '~interfaces/auth.navigation.types'

export const RegisterScreen: FC = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { navigate } = useNavigation<AuthNavigationComponent>()
	const { isShowKeyBoard } = useKeyboardVisible()
	const { user } = useAuth()

	const keyBoardHide = () => {
		Keyboard.dismiss()
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
								value={name}
								iconType="user"
								placeholder="Name"
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={(userName) =>
									userName && setName(normalizeWords(userName, 'First Upper'))
								}
								inputMode="text"
							/>
							<FormInput
								iconType="email"
								value={email}
								placeholder="Email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={(userEmail) =>
									setEmail(userEmail.toLocaleLowerCase())
								}
								inputMode="email"
							/>

							<FormInput
								value={password}
								placeholder="Password"
								iconType="lock"
								secureTextEntry={true}
								onChangeText={(userPassword) => setPassword(userPassword)}
							/>

							<View style={styles.buttonWrapper}>
								<FormButton
									title="Sign Up"
									onPress={() => {
										console.log({ name, email, password })
									}}
								/>
								<View style={styles.signInContainer}>
									<Text style={[styles.textLink]}>Already have account</Text>
									<TouchableOpacity onPress={() => navigate('SignIn')}>
										<Text style={[styles.textLink, styles.link]}>Sign In</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

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
		marginHorizontal: 20,
		flex: 1,
		marginTop: StatusBar.currentHeight && StatusBar.currentHeight,
		justifyContent: 'space-between',
	},

	logoWrapper: {
		marginTop: 20,
		width: '100%',
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
