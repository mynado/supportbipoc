import React from 'react'
import SearchFilter from './SearchSort'
import SearchResults from './SearchResults'

const SearchPage = () => {
	return (
		<div className="container">
			<div className="d-flex justify-content-between">
				<h2>Sökresultat</h2>
				<SearchFilter />
			</div>
			<SearchResults />
		</div>
	)
}

export default SearchPage
