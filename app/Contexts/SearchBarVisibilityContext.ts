import { Dispatch, SetStateAction, createContext } from 'react'

interface SearchBarVisibilityProps {
	searchBarVisibility: boolean
	setSearchBarVisibility: Dispatch<SetStateAction<boolean>>
	searchTerm: string
	setSearchTerm: Dispatch<SetStateAction<string>>
}

export const SearchBarVisibility = createContext<SearchBarVisibilityProps>({
	searchBarVisibility: false,
	setSearchBarVisibility: () => {},
	searchTerm: '',
	setSearchTerm: () => {}
})
