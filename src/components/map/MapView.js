import React, { useEffect, useMemo, useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { RiUserLocationFill } from 'react-icons/ri'
import ReactMapGL, { Marker } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import './MapView.scss'


const MapView = (props) => {
  const [companies, setCompanies] = useState([])
  const [userLocation, setUserLocation] = useState({})
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
  ), [props.companies])

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
        let newPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }
        setViewport({
            ...viewport,
            latitude: newPosition.latitude,
            longitude: newPosition.longitude,
            zoom: 15,
        })
        setUserLocation(newPosition)
    })
}

  return (
    <div>
      <button onClick={handleUserLocation}>My position</button>
      <ReactMapGL
        {...viewport}
        onViewportChange={(viewport => setViewport({...viewport, longitude: companies[0].coordinates.x_, latitude: companies[0].coordinates.N_}))}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}>
          {markers}
          {Object.keys(userLocation).length !== 0 ? (
            <Marker
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            >
              <RiUserLocationFill />
            </Marker>
          ) : ''}
      </ReactMapGL>
    </div>
  )
}

export default MapView