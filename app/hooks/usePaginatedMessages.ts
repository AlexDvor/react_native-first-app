import { useEffect, useState } from 'react'
import { UserService } from '~services/user.services'

// Імпортувати ваш сервіс для отримання повідомлень

const PAGE_SIZE = 20 // Розмір сторінки

export const usePaginatedMessages = (chatId: string) => {
	const [messages, setMessages] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const loadMoreMessages = async () => {
		if (isLoading) return

		setIsLoading(true)

		try {
			const newMessages = await UserService.getPaginatedMessages(
				chatId,
				currentPage,
				PAGE_SIZE
			) // Замініть на свій метод отримання повідомлень

			if (newMessages.length > 0) {
				setMessages((prevMessages) => [...prevMessages, ...newMessages])
				setCurrentPage(currentPage + 1)
			}
		} catch (error) {
			console.error('Error loading more messages:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadMoreMessages()
	}, []) // Завантажити першу сторінку повідомлень під час ініціалізації

	return { messages, isLoading, loadMoreMessages }
}
