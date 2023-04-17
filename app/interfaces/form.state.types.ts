import { IAnimalsData } from './animals.types'

export type TFormState = Omit<
	IAnimalsData,
	'id' | 'height' | 'owner' | 'behavior'
>
