import React, { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import Company from '../companies/Company'

const SearchResult = () => {
	const appContext = useContext(SearchContext)
	const { companies } = appContext

	return (
		<>
			{
				companies
				? (companies.map(company => (
					<Company company={company} key={company.id}/>
				)))
				: 'Finns inga sökresultat'
			}
		</>
	)
}

export default SearchResult

