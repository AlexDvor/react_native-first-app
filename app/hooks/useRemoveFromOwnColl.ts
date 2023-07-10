import { useState } from 'react'
import { UserService } from '~services/user/user.services'

export const useRemoveFromOwnColl = async (id: string) => {
	const [isLoading, setIsLoading] = useState(false)
	try {
		setIsLoading(true)
		const response = await UserService.removeOwnAnimalFromProfile(id)
		console.log('❌ ~ response:', response)
	} catch (error) {
	} finally {
		setIsLoading(false)
	}

	return {}
}
