import React, { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'

const SearchSort = () => {
	const appContext = useContext(SearchContext)
	const { sortResults } = appContext

	return (
		<>
			<div>
				<select className="custom-select" name="" id="" onChange={e => sortResults(e.target.value)}>
					<option value="" disabled>Sortera</option>
					<option value="name">A-Ö</option>
					<option value="category">Kategori</option>
				</select>
			</div>
		</>
	)
}

export default SearchSort
