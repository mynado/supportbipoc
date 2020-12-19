import React, { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'

const SearchBar = () => {
	const appContext = useContext(SearchContext)
	const { handleSubmit, handleChange } = appContext

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
						placeholder="Search..." 
						/>
					<button className="search-bar-button" type="submit">🔍</button>
				</div>
			</form>
		</>
	)
}

export default SearchBar