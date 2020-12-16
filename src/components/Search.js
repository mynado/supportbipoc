import {useState} from 'react'

const Search = () => {
	const [searchQuery, setSearchQuery] = useState(null)

	const handleChange = (e) => {
		setSearchQuery(e.target.value)
		console.log(searchQuery)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		console.log('search', searchQuery)
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
