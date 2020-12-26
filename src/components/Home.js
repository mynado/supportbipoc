import React from 'react'
import SearchBar from './search/SearchBar'
import {useState} from 'react'

const Home = () => {

	return (
		<div className="home-container">
			<h1>Support Your Local BIPOC</h1>
			<p>En plattform där du kan hitta tjänster och företag som drivs av personer som rasifieras som icke-vita.</p>
			<SearchBar/>
		</div>
	)
}

export default Home
