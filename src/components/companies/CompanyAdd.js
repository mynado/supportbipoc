import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, geopoint } from '../../firebase'

const AdminAddCompany = () => {
	const nameRef = useRef()
	const addressRef = useRef()
	const latitudeRef = useRef()
	const longitudeRef = useRef()
	const categoryRef = useRef()
	const infoRef = useRef()
	const slugRef = useRef()
	const searchTermRef = useRef()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(false)
		setLoading(true)
		const searchTermArray = searchTermRef.current.value.split(',').map(item => item.trim())

		try {
			await db.collection('companies').add({
				name: nameRef.current.value,
				address: addressRef.current.value,
				category: categoryRef.current.value,
				coordinates: new geopoint.GeoPoint(Number(latitudeRef.current.value), Number(longitudeRef.current.value)),
				info: infoRef.current.value,
				slug: slugRef.current.value,
				search_term: searchTermArray,
			})

			navigate(`/admin/home`)
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}

	}

	return (
		<>
			<div className="card container">
				<div className="card-body">
					<h2 className="card-title mb-3">Lägg till företag</h2>
						{error && (<div className="alert alert-danger">{error}</div>)}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Företagsnamn</label>
								<input 
									type="text"
									className="form-control"
									ref={nameRef}
									required/>
							</div>
							<div className="form-group">
								<label>Adress</label>
								<input
									type="text"
									className="form-control"
									ref={addressRef}/>
							</div>
							<div className="form-group">
								<label>Koordinater</label>
								<div className="d-flex justify-content-between align-items-center">
									<div className="mr-2">
										<label>Latitud</label>
										<input
											type="text"
											className="form-control"
											ref={latitudeRef}/>
									</div>
									<div>
										<label>Longitud</label>
										<input
											type="text"
											className="form-control"
											ref={longitudeRef}/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label>Välj en kategori</label>
								<select className="form-control" ref={categoryRef}>
									<option value="barber">Barberare</option>
									<option value="grocerie-store">Livsmedelsbutik</option>
									<option value="restaurant">Restaurang</option>
									<option value="store">Butik</option>
									<option value="salon">Salong</option>
								</select>
							</div>
							<div className="form-group">
								<label>Information</label>
								<textarea 
									className="form-control" 
									rows="3"
									ref={infoRef}></textarea>
							</div>
							<div className="form-group">
								<label>Slug</label>
								<input
									type="text"
									className="form-control"
									placeholder="ex. company-name"
									ref={slugRef}/>
							</div>
							<div className="form-group">
								<label>Sökord</label>
								<input
									type="text"
									className="form-control"
									placeholder="ex. mat, malmö, vietnamesisk, hälsa, värnhem"
									ref={searchTermRef}/>
							</div>
							<button disabled={loading} type="submit" className="btn btn-primary">Add</button>
						</form>
				</div>
			</div>
		</>
	)
}

export default AdminAddCompany
