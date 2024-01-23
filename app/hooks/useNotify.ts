import { useEffect, useState } from 'react'
import { UserService } from '~services/user.services'

import { useAuth } from './useAuth'

export const useNotify = () => {
	const [hasNotify, setHasNotify] = useState(false)
	const { user } = useAuth()

	useEffect(() => {
		const fetchNotify = async () => {
			if (!user?.id) return
			try {
				const userData = await UserService.getUserRef(user?.id)
				const notifyColl = userData.user.notifications
				const hasUnreadMessages = notifyColl.some(
					(notify) => notify.read === false
				)
				setHasNotify(hasUnreadMessages)
			} catch (error) {
				console.error('Error fetching notifications:', error)
			}
		}
		fetchNotify()
	}, [])

	return {
		hasNotify,
	}
}
