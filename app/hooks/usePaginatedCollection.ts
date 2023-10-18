import { useEffect, useState } from 'react'
import { IAnimalsData } from '~interfaces/animals.types'
import { UserService } from '~services/user/user.services'

type TSelectedAnimalType = 'All' | 'Dog' | 'Cat'

const PAGE_SIZE = 10

export const usePaginatedCollection = (
	selectedAnimalType: TSelectedAnimalType,
	currentPage: number
) => {
	const [animals, setAnimals] = useState<IAnimalsData[]>([])
	const [totalPage, setTotalPage] = useState(0)
	const [isFetching, setIsFetching] = useState(false)
	const [resetPage, setResetPage] = useState(false)
	const [isPaginationLoading, setIsPaginationLoading] = useState(false)

	const fetchCollection = async () => {
		try {
			if (resetPage) {
				currentPage = 1
				setResetPage(false)
			}

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
				setAnimals((prevAnimals) => [...prevAnimals, ...data])
			}
		} catch (error) {
			console.error('Error loading more animals', error)
		} finally {
			setIsFetching(false)
			setIsPaginationLoading(false)
		}
	}

	useEffect(() => {
		setResetPage(true)
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
	}
}
