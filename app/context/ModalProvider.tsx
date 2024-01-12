import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react'
import { CustomAlert } from '~components/ui/CustomAlert/CustomAlert'

interface ModalState {
	title: string
	text: string
	showModal: boolean
}

interface ModalContextProps {
	modalState: ModalState
	showModal: (title: string, text: string) => void
	hideAlert: () => void
}

const ModelContext = createContext<ModalContextProps | undefined>(undefined)

interface AlertProviderProps {
	children: ReactNode
}

export const ModalProvider: FC<AlertProviderProps> = ({ children }) => {
	const [modalState, setModalState] = useState<ModalState>({
		title: '',
		text: '',
		showModal: false,
	})

	const showModal = (title: string, text: string) => {
		setModalState({
			title,
			text,
			showModal: true,
		})
	}

	const hideAlert = () => {
		setModalState({
			title: '',
			text: '',
			showModal: false,
		})
	}

	const value: ModalContextProps = {
		modalState,
		showModal,
		hideAlert,
	}

	return (
		<ModelContext.Provider value={value}>
			{children}
			<CustomAlert
				visible={modalState.showModal}
				message={modalState.text}
				onClose={hideAlert}
				onConfirm={() => {
					hideAlert()
				}}
			/>
		</ModelContext.Provider>
	)
}

export const useCustomModal = (): ModalContextProps => {
	const context = useContext(ModelContext)
	if (!context) {
		throw new Error('useCustomModal must be used within an ModalProvider')
	}
	return context
}
