import { useEffect, useState } from 'react'

const useCurrentLocation = () => {
    const [userLocation, setUserLocation] = useState(null)

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {
          let newLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
          }

          setUserLocation(newLocation)
      })
    })

    return { userLocation }
}

export default useCurrentLocation
