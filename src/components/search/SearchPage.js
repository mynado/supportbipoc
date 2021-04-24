import React from 'react'
import SearchSort from './SearchSort'
import SearchResults from './SearchResults'

const SearchPage = () => {
	return (
		<div className="container">
			<div className="d-flex justify-content-between mb-3">
				<h2>Sökresultat</h2>
				<SearchSort />
			</div>
			<SearchResults />
		</div>
	)
}

export default SearchPage
