import { useEffect, useState } from 'react'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

type TSelectedAnimalType = 'All' | 'Dog' | 'Cat'

const PAGE_SIZE = 10

export const usePaginatedCollection = (
	selectedAnimalType: TSelectedAnimalType
) => {
	const [animals, setAnimals] = useState<IAnimalsData[]>([])
	const [totalPage, setTotalPage] = useState(0)
	const [isFetching, setIsFetching] = useState(false)
	const [isPaginationLoading, setIsPaginationLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)

	const loadMoreAnimals = () => {
		if (animals.length < 10 || currentPage === totalPage) {
			console.log("The list of animals doesn't have more items")
			return
		}
		setCurrentPage((prevPage) => prevPage + 1)
	}

	const fetchCollection = async () => {
		try {
			if (currentPage > 1) {
				setIsPaginationLoading(true)
			} else {
				setIsFetching(true)
			}

			const { data, totalPages } = await UserService.getCollection(
				selectedAnimalType,
				currentPage,
				PAGE_SIZE
			)

			setTotalPage(totalPages)

			if (currentPage === 1) {
				setAnimals(data)
			} else {
				setAnimals((prev) => [...prev, ...data])
			}
		} catch (error) {
			console.error('Error loading more animals', error)
		} finally {
			setIsFetching(false)
			setIsPaginationLoading(false)
		}
	}

	useEffect(() => {
		setCurrentPage(1)
		setAnimals([])
		setTotalPage(0)
	}, [selectedAnimalType])

	useEffect(() => {
		fetchCollection()
	}, [selectedAnimalType, currentPage])

	return {
		animals,
		currentPage,
		isFetching,
		totalPage,
		isPaginationLoading,
		loadMoreAnimals,
	}
}
