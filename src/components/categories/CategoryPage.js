import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useCategories from '../../hooks/useCategories'
import Company from '../companies/Company'
import MapView from '../map/MapView'
import useCurrentLocation from '../../hooks/useCurrentLocation'
import './CategoryPage.scss'

const CategoryPage = () => {
	const { categoryName } = useParams()
	const { companies, loading } = useCategories(categoryName)
	const { userLocation } = useCurrentLocation()
	const [currentUserLocation, setCurrentUserLocation] = useState(null)
	const [mapFocus, setMapFocus] = useState(false)

	useEffect(() => {
		if (loading) {
			return (<p>Loading...</p>)
		}
		setCurrentUserLocation(userLocation)
		document.body.style.overflow = "hidden"
		const unsubscribe =  () => {
			document.body.style.overflow = "unset"
		}
		return unsubscribe
	}, [userLocation, currentUserLocation, loading])

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
				<h2 className="category-page-heading">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
				<div className="company-wrapper">
					{
						companies
						? (companies.map(company => (
							<Company
								company={company}
								key={company.id}
								userLocation={currentUserLocation}/>
						)))
						: 'Finns inga sökresultat'
					}
				</div>
			</div>
		</div>
	)
}

export default CategoryPage
