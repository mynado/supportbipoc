import React, { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'

const SearchResult = () => {
	const appContext = useContext(SearchContext)
	const { companies } = appContext

	return (
		<>
			{
				companies
				? (companies.map(company => (
					<div key={company.id}>
						<h2>{company.name}</h2>
					</div>
				)))
				: 'Finns inga sökresultat'
			}
		</>
	)
}

export default SearchResult

