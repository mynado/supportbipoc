import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import SearchSort from './SearchSort'
import Company from '../companies/Company'
import MapView from '../map/MapView'
import useCurrentLocation from '../../hooks/useCurrentLocation'
import './SearchResults.scss'

const SearchResult = () => {
	const appContext = useContext(SearchContext)
	const { companies } = appContext
	const [currentUserLocation, setCurrentUserLocation] = useState(null)
	const [mapFocus, setMapFocus] = useState(false)
	const { userLocation } = useCurrentLocation()

	useEffect(() => {
		setCurrentUserLocation(userLocation)
		console.log(currentUserLocation)
	}, [userLocation, currentUserLocation])

	return (
		<>
			{
				companies 
					? (
						<>
							<div
								className="map-wrapper"
								onClick={() => {
									setMapFocus(true)
								}}>
								<MapView companies={companies} page={'search'}/>
							</div>
							<div
								className={`company-wrapper row justify-content-start mt-4 ${mapFocus ? 'map-focus-list' : ''}`}
								onClick={() => {
									setMapFocus(false)
								}}>
								<div className="results-heading-wrapper">
									<h2>Sökresultat</h2>
									<SearchSort />
								</div>
								{
									companies.map(company => (
										<Company company={company} key={company.id} userLocation={currentUserLocation}/>
									))
								}	
							</div>
						</>
					) : <p>Finns inga sökresultat</p>
			}
		</>
	)
}

export default SearchResult

