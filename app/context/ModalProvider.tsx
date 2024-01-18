import React, {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
} from 'react'
import { CustomModal } from '~components/ui/CustomModal/CustomModal'

interface ModalState {
	title?: string
	text: string
	handleConfirmFn: () => void
	handleCancelFn?: () => void
	showModal: boolean
}

interface ModalContextProps {
	modalState: ModalState
	showModal: (options: {
		title?: string
		text: string
		confirmFn: () => void
		cancelFn?: () => void
	}) => void
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
		handleConfirmFn: () => {},
		handleCancelFn: () => {},
	})

	const showModal = (options: {
		title?: string
		text: string
		confirmFn: () => void
		cancelFn?: () => void
	}) => {
		setModalState({
			text: options.text,
			title: options.title,
			handleConfirmFn: options.confirmFn,
			handleCancelFn: options.cancelFn,
			showModal: true,
		})
	}

	const hideModal = () => {
		setModalState({
			text: '',
			title: '',
			showModal: false,
			handleConfirmFn() {},
		})
	}

	const handleConfirm = () => {
		if (modalState.handleConfirmFn) {
			modalState.handleConfirmFn()
		}
		hideModal()
	}

	const handleCancel = () => {
		if (modalState.handleCancelFn) {
			modalState.handleCancelFn()
		}
		hideModal()
	}

	const value: ModalContextProps = {
		modalState,
		showModal,
		hideModal,
	}

	return (
		<ModelContext.Provider value={value}>
			{children}
			<CustomModal
				visible={modalState.showModal}
				message={modalState.text}
				title={modalState.title}
				onClose={handleCancel}
				onConfirm={handleConfirm}
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
