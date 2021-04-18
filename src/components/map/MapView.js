import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import ReactMapGL, { Marker } from "react-map-gl"


const MapView = (props) => {
  const [companies, setCompanies] = useState([])
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "40vh",
    latitude: 55.6019,
    longitude: 12.9984,
    zoom: 13
  })

  useEffect(() => {
    setCompanies(props.companies)
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [companies])

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport => setViewport({...viewport}))}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}>
           {
            companies 
              ? companies.map(company => (
                  <Marker
                    key={company.id}
                    latitude={company.coordinates.N_}
                    longitude={company.coordinates.x_}>
                  <IoLocationSharp />
                </Marker>
                ))
              : ('')
          }
      </ReactMapGL>
    </div>
  )
}

export default MapView