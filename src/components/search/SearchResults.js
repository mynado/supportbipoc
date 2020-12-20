import React, { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import SearchResultCard from './SearchResultCard'

const SearchResult = () => {
	const appContext = useContext(SearchContext)
	const { companies } = appContext

	return (
		<>
			<div className="">
				{
					companies
					? (companies.map(company => (
						<SearchResultCard company={company} key={company.id}/>
					)))
					: 'Finns inga sökresultat'
				}
			</div>
		</>
	)
}

export default SearchResult

