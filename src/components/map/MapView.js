import React, { useEffect, useMemo, useState } from 'react'
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import './MapView.scss'
import CustomMarker from './CustomMarker'


const MapView = (props) => {
  const [companies, setCompanies] = useState([])
  const [viewport, setViewport] = useState(null)

  useEffect(() => {
    if (props.page === 'search') {
      setViewport({
        width: "100%",
        height: "600px",
        latitude: 55.6019,
        longitude: 12.9984,
        zoom: 13
      })
    }

    if (props.page === 'company-page') {
      setViewport({
        width: "100%",
        height: "300px",
        latitude: props.companies[0].coordinates.N_,
        longitude: props.companies[0].coordinates.x_,
        zoom: 15
      }) 
    }
    setCompanies(props.companies)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies])

  const markers = useMemo(() => props.companies.map((company, index) => (
      <CustomMarker key={company.id} company={company} index={index}/>
    )
  ), [props.companies])

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport => setViewport({...viewport}))}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}>
          {markers}
          <div className="map-control-container">
            <NavigationControl style={{
                position: 'relative'
              }}/>
            <GeolocateControl
              style={{
                position: 'relative',
                marginTop: '8px',
              }}
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
              auto={props.page === 'search' ? true : false}
            />
          </div>
      </ReactMapGL>
    </div>
  )
}

export default MapView