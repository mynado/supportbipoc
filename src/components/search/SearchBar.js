import {useState} from 'react'
import useSearch from '../../hooks/useSearch'

const SearchBar = () => {
	const [inputValue, setInputValue] = useState(null)
	const [searchQuery, setSearchQuery] = useState(null)
	const { companies, loading } = useSearch(searchQuery)

	const handleChange = (e) => {
		setInputValue(e.target.value)
		
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		setSearchQuery(inputValue)

	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="search-bar form-group d-flex">
					<input onChange={handleChange} type="text" className="search-bar-input form-control" id="search-query" aria-describedby="search" placeholder="Search..." />
					<button className="search-bar-button" type="submit">🔍</button>
				</div>
			</form>

			{
				companies.length >= 1 
				? (companies.map(company => (
					<div key={company.id}>
						<h2>{company.name}</h2>
					</div>
				)))
				: (<p>Finns inga sökresultat</p>)
			}
		</>
	)
}

export default SearchBar
