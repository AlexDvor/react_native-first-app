import { useEffect, useState } from 'react'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

type TSelectedAnimalType = 'All' | 'Dog' | 'Cat'

const PAGE_SIZE = 10

export const usePaginatedCollection = (
	selectedAnimalType: TSelectedAnimalType
) => {
	const [animals, setAnimals] = useState<IAnimalsData[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isFetching, setIsFetching] = useState(false)

	const fetchCollection = async () => {
		try {
			setIsFetching(true)
			const allCollection = await UserService.getCollection(
				selectedAnimalType,
				currentPage,
				PAGE_SIZE
			)

			if (allCollection.length > 0) {
				setAnimals(allCollection)
				// setAnimals((prevAnimals) => [...prevAnimals, ...allCollection])
				// setCurrentPage((prevPage) => prevPage + 1)
			} else {
				setAnimals([])
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
	}
}
