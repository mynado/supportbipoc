import React, { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import Company from '../companies/Company'
import MapView from '../map/MapView'

const SearchResult = () => {
	const appContext = useContext(SearchContext)
	const { companies } = appContext

	return (
		<>
			{
				companies 
					? (
						<>
							<MapView companies={companies} />
							<div className="row justify-content-start mt-4">
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

