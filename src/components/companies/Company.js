import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getDistance } from 'geolib'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'
import './Company.scss'

const Company = (props) => {
	const { currentUser } = useAuth()
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	const handleDelete = async () => {
		setError(false)

		try {
			await db.collection('companies').doc(props.company.id).delete()
			navigate(`/companies`)
		} catch (e) {
			setError(e.message)
		}
	}

	const getDistancefromLocation = () => {
		if (props.userLocation) {
			return getDistance(props.userLocation, {
                latitude: props.company.coordinates.N_,
                longitude: props.company.coordinates.x_,
            })
		}
	}

	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
			<Link to={`/companies/${props.company.slug}`}>
				<div className="card company-card">
					<div className="card-img-container">
						<img className="card-img-top" src={props.company.thumbnail_url ? props.company.thumbnail_url : "https://dummyimage.com/300x200/ccc/fff&text=No+Image"} alt="" />
					</div>
					<div className="card-body">
						<h5 className="card-title">{props.company.name}</h5>
						{error && (<div className="alert alert-danger">{error}</div>)}
						<div className="category-distance-wrapper"> 
							<small>{props.company.category}</small>
							<small>{getDistancefromLocation()} m away</small>
						</div>
						<div className="d-flex justify-content-end">
							{
								currentUser && (
									<button onClick={handleDelete} className="btn ml-2">X</button>
								)
							}
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default Company
