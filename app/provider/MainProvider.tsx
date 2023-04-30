import { NavigationContainer } from '@react-navigation/native'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '~store/store'

interface MainProviderProps {
	children: ReactNode
}

const MainProvider: FC<MainProviderProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<NavigationContainer>{children}</NavigationContainer>
		</Provider>
	)
}

export default MainProvider
