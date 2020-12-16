import React from 'react'

const Search = () => {
	return (
		<>
			<form>
				<div className="form-group d-flex">
					<input type="text" className="form-control" id="search-query" aria-describedby="search" placeholder="Search..." />
					<button type="submit">🔍</button>
				</div>
				
			</form>
		</>
	)
}

export default Search
