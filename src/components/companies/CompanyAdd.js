import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'

const AdminAddCompany = () => {
	const nameRef = useRef()
	const addressRef = useRef()
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
					<h5 className="card-title">Add Company</h5>
						{error && (<div className="alert alert-danger">{error}</div>)}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Name</label>
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
