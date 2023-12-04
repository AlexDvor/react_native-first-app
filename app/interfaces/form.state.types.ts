import { IAnimalsData } from './animals.types'

export type TFormState = Omit<IAnimalsData, 'id'>
