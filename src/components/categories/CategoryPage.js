import React from 'react'
import { useParams } from 'react-router-dom'
import useCategories from '../../hooks/useCategories'
import Company from '../companies/Company'

const CategoryPage = () => {
	const { categoryName } = useParams()
	const { companies, loading } = useCategories(categoryName)

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<div>
			<h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
			<div className="">
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
