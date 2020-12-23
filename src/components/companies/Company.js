import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase'

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
	return (
		<>
			<div className="card">
				<img className="card-img-top" src={props.company.thumbnail_url ? props.company.thumbnail_url : "https://dummyimage.com/300x200/ccc/fff&text=No+Image"} alt="" />
				<div className="card-body">
					<h5 className="card-title">{props.company.name}</h5>
					{error && (<div className="alert alert-danger">{error}</div>)}
					<small>{props.company.category}</small>
					<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<div className="d-flex justify-content-between">
						<Link to={`/companies/${props.company.slug}`} className="btn btn-primary">Go somewhere</Link>
						{
							currentUser && (
								<button onClick={handleDelete} className="btn btn-danger">Radera</button>
							)
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Company
