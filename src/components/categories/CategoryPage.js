import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useCategories from '../../hooks/useCategories'
import Company from '../companies/Company'
import MapView from '../map/MapView'
import './CategoryPage.scss'

const CategoryPage = () => {
	const { categoryName } = useParams()
	const { companies, loading } = useCategories(categoryName)
	const [mapFocus, setMapFocus] = useState(false)

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<div className="category-page">
			<div
				className="map-wrapper"
				onClick={() => {
					setMapFocus(true)
				}}>
				<MapView companies={companies} page={'search'}/>
			</div>
			<div 
				className={`category-page-content-wrapper ${mapFocus ? 'map-focus-list' : ''}`}
				onClick={() => {
					setMapFocus(false)
				}}>
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
		</div>
	)
}

export default CategoryPage
