import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

const AdminAddCompany = () => {
	const nameRef = useRef()
	const addressRef = useRef()
	const categoryRef = useRef()
	const slugRef = useRef()
	const searchTermRef = useRef()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const { currentUser } = useAuth()
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
			<div className="card">
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
								<label>Kategori</label>
								<input
									type="text"
									className="form-control"
									ref={categoryRef}/>
							</div>
							<div className="form-group">
								<label>Slug</label>
								<input
									type="text"
									className="form-control"
									ref={slugRef}/>
							</div>
							<div className="form-group">
								<label>Sökord</label>
								<input
									type="text"
									className="form-control"
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
