import {useState} from 'react'
import useSearch from '../hooks/useSearch'
// import { useSearch } from '../contexts/searchContext'

const Search = () => {
	const [searchQuery, setSearchQuery] = useState(null)
	const { companies, loading, search } = useSearch(searchQuery)
	// const { search } = useSearch()

	const handleChange = (e) => {
		setSearchQuery(e.target.value)

	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log('companies', companies)
		// search(searchQuery)
		// search(searchQuery)

		console.log('companies', companies)

	
		// console.log('search', searchQuery)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="search-bar form-group d-flex">
					<input onChange={handleChange} type="text" className="search-bar-input form-control" id="search-query" aria-describedby="search" placeholder="Search..." />
					<button className="search-bar-button" type="submit">🔍</button>
				</div>
			</form>
		</>
	)
}

export default Search
