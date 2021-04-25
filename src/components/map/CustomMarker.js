import { useState } from 'react'
import { Marker, Popup } from "react-map-gl"
import { IoLocationSharp } from 'react-icons/io5'
import './CustomMarker.scss'

const CustomMarker = ({ company }) => {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <>
            <Marker
                key={company.id}
                longitude={company.coordinates.x_} latitude={company.coordinates.N_} onClick={() => setShowPopup(true)}>
                <IoLocationSharp />
            </Marker>
            {
            showPopup && (
                <Popup
                latitude={company.coordinates.N_}
                longitude={company.coordinates.x_}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup(false)}
                anchor="top" >
                    <div>
                        <p>{company.name}</p>
                        <small>{company.address}</small>
                    </div>
                </Popup>
            )
            }
        </>
    )
}

export default CustomMarker
