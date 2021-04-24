import React, { useEffect, useMemo, useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import ReactMapGL, { Marker } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css'


const MapView = (props) => {
  const [companies, setCompanies] = useState([])
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "400px",
    latitude: 55.6019,
    longitude: 12.9984,
    zoom: 13
  })

  useEffect(() => {
    setCompanies(props.companies)
    console.log(props.companies)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies])

const markers = useMemo(() => props.companies.map(company => (
    <Marker key={company.id} longitude={company.coordinates.x_} latitude={company.coordinates.N_} >
      <IoLocationSharp />
    </Marker>)
), [props.companies]);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport => setViewport({...viewport, longitude: companies[0].coordinates.x_, latitude: companies[0].coordinates.N_}))}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}>
          {markers}
      </ReactMapGL>
    </div>
  )
}

export default MapView