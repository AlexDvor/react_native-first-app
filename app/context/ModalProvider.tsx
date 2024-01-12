import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react'
import { CustomAlert } from '~components/ui/CustomAlert/CustomModal'

interface ModalState {
	title?: string
	text: string
	showModal: boolean
}

interface ModalContextProps {
	modalState: ModalState
	showModal: (options: { title?: string; text: string }) => void
	hideModal: () => void
}

const ModelContext = createContext<ModalContextProps | undefined>(undefined)

interface ModalProviderProps {
	children: ReactNode
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
	const [modalState, setModalState] = useState<ModalState>({
		text: '',
		title: '',
		showModal: false,
	})

	const showModal = (options: { title?: string; text: string }) => {
		setModalState({
			text: options.text,
			title: options.title,
			showModal: true,
		})
	}

	const hideModal = () => {
		setModalState({
			text: '',
			title: '',
			showModal: false,
		})
	}

	const value: ModalContextProps = {
		modalState,
		showModal,
		hideModal,
	}

	return (
		<ModelContext.Provider value={value}>
			{children}
			<CustomAlert
				visible={modalState.showModal}
				message={modalState.text}
				title={modalState.title}
				onClose={hideModal}
				onConfirm={hideModal}
			/>
		</ModelContext.Provider>
	)
}

export const useCustomModal = (): ModalContextProps => {
	const context = useContext(ModelContext)
	if (!context) {
		throw new Error('useCustomModal must be used within a ModalProvider')
	}
	return context
}
