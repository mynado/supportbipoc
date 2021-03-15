import React, { useContext, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'
import useClickOutside from '../../hooks/useClickOutside'
import { FiSearch } from 'react-icons/fi'
import { IoFilterSharp } from 'react-icons/io5'
import './SearchBar.scss'
import SearchFilter from './SearchFilter'

const SearchBar = ({ open }) => {
	const node = useRef()
	const appContext = useContext(SearchContext)
	const { handleSubmit, handleChange } = appContext
	const search = useLocation().search;
	const query = new URLSearchParams(search).get('q');
	const [openFilter, setOpenFilter] = useState(false)

	const handleOpenFilter = () => {
		setOpenFilter(!openFilter)
	}

	useClickOutside(node, () => {
		if (openFilter) {
			setOpenFilter(!openFilter)
		}
	});
	

	useEffect(() => {
		if (openFilter) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [openFilter])

	return (
		<>
			<div className="search-bar-container" style={ open ? {visibility: 'hidden'} : {}}>
				<form onSubmit={handleSubmit} className="search-bar-form">
					<div className="search-bar form-group d-flex">
						<div className="filter-button" onClick={handleOpenFilter}><IoFilterSharp /></div>
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
					<div className="search-filter">
						{ openFilter &&(<div ref={node}><SearchFilter /></div>) }
					</div>
				</form>
			</div>
		</>
	)
}

export default SearchBar