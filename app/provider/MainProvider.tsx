import { NavigationContainer } from '@react-navigation/native'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from '~store/store'

import AuthProvider from './AuthProvider'

const MainProvider: FC = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<AuthProvider />
			</NavigationContainer>
		</Provider>
	)
}

export default MainProvider
