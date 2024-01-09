import { useEffect, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import { defaultUserAvatar } from '~constants/icons'
import { ImageService, uploadImageAsyncParam } from '~services/image.services'

import { useActions } from './useActions'
import { useAuth } from './useAuth'

export const useAvatarUser = () => {
	const [imageUser, setImageUser] =
		useState<ImageSourcePropType>(defaultUserAvatar)
	const [isLoading, setIsLoading] = useState(false)
	const { updateUser } = useActions()
	const { user } = useAuth()

	useEffect(() => {
		const fetchAvatar = async () => {
			if (user?.avatar) {
				setImageUser({ uri: user.avatar })
			} else {
				try {
					setIsLoading(true)
					const imgUri = await ImageService.findAvatarByIdUser(user?.id || '')
					if (imgUri) {
						setImageUser({ uri: imgUri })
					} else {
						setImageUser(defaultUserAvatar)
					}
				} catch (error) {
					console.log('❌ ~ error useAvatarUser:', error)
				} finally {
					setIsLoading(false)
				}
			}
		}
		fetchAvatar()
	}, [])

	const updateAvatarUser = async (imageObj: uploadImageAsyncParam) => {
		try {
			setIsLoading(true)
			const urlImg = await ImageService.uploadAvatarImage(imageObj)
			updateUser({ userId: user?.id || '', newData: { avatar: urlImg } })
			setImageUser({ uri: urlImg })
		} catch (error) {
			console.log('❌ ~ error updateAvatarUser:', error)
			setImageUser(defaultUserAvatar)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoadingImg: isLoading,
		urlAvatar: imageUser,
		updateAvatarUser,
	}
}
