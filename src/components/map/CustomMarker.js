import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Marker, Popup } from "react-map-gl"
import { IoLocationSharp } from 'react-icons/io5'
import useClickOutside from '../../hooks/useClickOutside'
import './CustomMarker.scss'

const CustomMarker = ({ company }) => {
    const node = useRef()
    const [showPopup, setShowPopup] = useState(false)

    useClickOutside(node, () => {
		if (showPopup) {
			setShowPopup(!showPopup)
		}
	});

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
                    <div className="popup-wrapper" ref={node}>
                        <p className="company-title">{company.name}</p>
                        <small>{company.address}</small>
                        <Link className="company-link" to={`/companies/${company.slug}`}>Läs mer</Link>
                    </div>
                </Popup>
            )
            }
        </>
    )
}

export default CustomMarker
