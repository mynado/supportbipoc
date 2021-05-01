import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'
import { FiSearch } from 'react-icons/fi'
import './SearchBar.scss'

const SearchBar = ({ open }) => {
	const appContext = useContext(SearchContext)
	const { handleSubmit, handleChange } = appContext
	const search = useLocation().search;
	const query = new URLSearchParams(search).get('q');

	return (
		<>
			<div className={`search-bar-container ${open ? 'search-bar-menu-open' : 'search-bar-menu-close'}`}>
				<form onSubmit={handleSubmit} className="search-bar-form">
					<div className="search-bar form-group d-flex">
						<input 
							onChange={handleChange}
							type="text"
							className="search-bar-input form-control"
							id="search-query"
							aria-describedby="search"
							placeholder={query ? query : 'Search...'}
							/>
						<button className="search-bar-button" type="submit"><FiSearch /></button>
					</div>
				</form>
			</div>
		</>
	)
}

export default SearchBar