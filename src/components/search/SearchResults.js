import React, { useContext, useState } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import Company from '../companies/Company'
import MapView from '../map/MapView'
import './SearchResults.scss'

const SearchResult = () => {
	const appContext = useContext(SearchContext)
	const { companies } = appContext
	const [mapFocus, setMapFocus] = useState(false)

	return (
		<>
			{
				companies 
					? (
						<>
							<div
								className={`map-wrapper ${mapFocus ? 'map-focus' : ''}`}
								onClick={() => {
									setMapFocus(true)
								}}>
								<MapView companies= {companies}/>
							</div>
							<div
								className={`company-wrapper row justify-content-start mt-4 ${mapFocus ? 'map-focus-list' : ''}`}
								onClick={() => {
									setMapFocus(false)
								}}>
								{
									companies.map(company => (
										<Company company={company} key={company.id}/>
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

