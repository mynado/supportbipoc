import React from 'react'
import SearchBar from './SearchBar'
import SearchFilter from './SearchSort'
import SearchResults from './SearchResults'

const SearchPage = () => {
	return (
		<>
			<SearchBar />
			<div className="d-flex justify-content-between">
				<h2>Sökresultat</h2>
				<SearchFilter />
			</div>
			
			<SearchResults />
			
		</>
	)
}

export default SearchPage
