import React from 'react'
import Categories from './categories/Categories'
import SearchBar from './search/SearchBar'

const Home = () => {

	return (
		<div className="home-wrapper">
			<div className="home-container">
				<h1>Support Your Local BIPOC</h1>
				<p>En plattform där du kan hitta tjänster och företag som drivs av personer som rasifieras som icke-vita.</p>
				<SearchBar/>
				<Categories />
			</div>
		</div>
	)
}

export default Home
