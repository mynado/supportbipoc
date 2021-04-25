import React, { useEffect, useMemo, useState } from 'react'
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import './MapView.scss'
import CustomMarker from './CustomMarker'


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
    handleUserLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies])

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.longitude)
        let newPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }
        setViewport({
            ...viewport,
            latitude: newPosition.latitude,
            longitude: newPosition.longitude,
        })
    })
  }

  const markers = useMemo(() => props.companies.map((company, index) => (
      <CustomMarker company={company} index={index}/>
    )
  ), [props.companies])

  return (
    <div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport => setViewport({...viewport}))}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}>
          {markers}
          <div class="map-control-container">
            <NavigationControl style={{
                position: 'relative'
              }}/>
            <GeolocateControl
              style={{
                position: 'relative',
                'margin-top': '8px',
              }}
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
              auto
            />
          </div>
      </ReactMapGL>
    </div>
  )
}

export default MapView