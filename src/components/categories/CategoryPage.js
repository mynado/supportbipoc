import React from 'react'
import { useParams } from 'react-router-dom'
import useCategories from '../../hooks/useCategories'
import Company from '../companies/Company'
import './Categories.scss'

const CategoryPage = () => {
	const { categoryName } = useParams()
	const { companies, loading } = useCategories(categoryName)

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<div className="category-page container">
			<h1 className="category-page-heading">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
			<div className="row">
				{
					companies
					? (companies.map(company => (
						<Company company={company} key={company.id}/>
					)))
					: 'Finns inga sökresultat'
				}
			</div>
		</div>
	)
}

export default CategoryPage
