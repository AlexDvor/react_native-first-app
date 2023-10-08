import { useEffect, useState } from 'react'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

type TSelectedAnimalType = 'All' | 'Dog' | 'Cat'

const PAGE_SIZE = 20

export const usePaginatedCollection = (
	selectedAnimalType: TSelectedAnimalType
) => {
	const [animals, setAnimals] = useState<IAnimalsData[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isFetching, setIsFetching] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	const fetchCollection = async () => {
		if (!hasMore || isFetching) {
			return
		}

		try {
			setIsFetching(true)
			const allCollection = await UserService.getCollection(
				selectedAnimalType,
				currentPage
			)

			if (allCollection.length > 0) {
				setAnimals((prevAnimals) => [...prevAnimals, ...allCollection])
				setCurrentPage((prevPage) => prevPage + 1)
			} else {
				// Якщо не було нових даних, встановлюємо hasMore в false, щоб завершити пагінацію
				setHasMore(false)
			}
		} catch (error) {
			console.error('Error loading more animals', error)
		} finally {
			setIsFetching(false)
		}
	}

	useEffect(() => {
		fetchCollection()
	}, [selectedAnimalType, currentPage])

	return {
		animals,
		currentPage,
		isFetching,
		loadMoreAnimals: fetchCollection,
		hasMore,
	}
}
