import { NavigationContainer } from '@react-navigation/native'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '~store/store'

interface MainProviderProps {
	children: ReactNode
}

const MainProvider: FC<MainProviderProps> = ({ children }) => {
	return (
		<NavigationContainer>
			<Provider store={store}>{children}</Provider>
		</NavigationContainer>
	)
}

export default MainProvider
