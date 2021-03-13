import React from 'react'
import './SearchPage.scss'
import SearchBar from './SearchBar'
import SearchFilter from './SearchSort'
import SearchResults from './SearchResults'

const SearchPage = () => {
	return (
		<>
			<div className="whitespace"></div>
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
