import React from 'react'
import { Link } from 'react-router-dom'

const SearchResultCard = (props) => {
	console.log(props)
	return (
		<>
			<div className="card">
				<img className="card-img-top" src={props.company.thumbnail_url ? props.company.thumbnail_url : "https://dummyimage.com/300x200/ccc/fff&text=No+Image"} alt="" />
				<div className="card-body">
					<h5 className="card-title">{props.company.name}</h5>
					{
						props.company.categories.map(category => (
							<small key={category}>{category + ' '}</small>
						))
					}
					<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<Link to={`/company/${props.company.name}`} className="btn btn-primary">Go somewhere</Link>
				</div>
			</div>
		</>
	)
}

export default SearchResultCard
