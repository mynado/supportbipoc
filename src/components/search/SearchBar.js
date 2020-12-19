import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'

const SearchBar = () => {
	const appContext = useContext(SearchContext)
	const { handleSubmit, handleChange } = appContext
	const search = useLocation().search;
	const query = new URLSearchParams(search).get('q');

	return (
		<>
			<form onSubmit={handleSubmit}>
			<div className="search-bar form-group d-flex">
				<input 
						onChange={handleChange}
						type="text"
						className="search-bar-input form-control"
						id="search-query"
						aria-describedby="search"
						placeholder={query ? query : 'Search...'}
						/>
					<button className="search-bar-button" type="submit">🔍</button>
				</div>
			</form>
		</>
	)
}

export default SearchBar