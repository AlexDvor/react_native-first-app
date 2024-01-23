import { useEffect, useState } from 'react'
import { TNotification } from '~interfaces/notification'
import { UserService } from '~services/user.services'

import { useAuth } from './useAuth'

/**
 * Custom React hook for managing notifications.
 * @returns {Object} An object containing notification-related state.
 */

export const useNotify = () => {
	const [hasNotify, setHasNotify] = useState(false)
	const [notification, setNotification] = useState<TNotification[]>([])
	const { user } = useAuth()

	useEffect(() => {
		const fetchNotify = async () => {
			if (!user?.id) return
			try {
				const userData = await UserService.getUserRef(user?.id)
				const notifyList = userData.user.notifications || []
				const hasUnreadMessages = notifyList.some(
					(notify) => notify.read === false
				)
				setNotification(notifyList)
				setHasNotify(hasUnreadMessages)
			} catch (error) {
				console.error('Error fetching notifications:', error)
			}
		}
		fetchNotify()
	}, [])

	return {
		hasNotify,
		notification,
	}
}
