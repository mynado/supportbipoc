import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import useCompany from '../../hooks/useCompany'
import useImages from '../../hooks/useImages'
import UploadImage from '../images/UploadImage'

const CompanyEdit = () => {
	const nameRef = useRef()
	const addressRef = useRef()
	const categoryRef = useRef()
	const infoRef = useRef()
	const slugRef = useRef()
	const searchTermRef = useRef()
	const { companyName } = useParams()
	const { company, loading } = useCompany(companyName)
	const { images, imgLoading } = useImages(company)
	const [formLoading, setFormLoading] = useState(false)
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	if (loading) {
		return (<p>Loading...</p>)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(false)
		setFormLoading(true)
		const searchTermArray = searchTermRef.current.value.split(',').map(item => item.trim())

		try {
			await db.collection('companies').doc(company.id).update({
				name: nameRef.current.value,
				address: addressRef.current.value,
				category: categoryRef.current.value,
				info: infoRef.current.value,
				slug: slugRef.current.value,
				search_term: searchTermArray,
			})

			navigate(`/companies/${company.slug}`)
		} catch (e) {
			setError(e.message)
			setFormLoading(false)
		}

	}


	return (
		<>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{company.name}</h5>
						{error && (<div className="alert alert-danger">{error}</div>)}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Name</label>
								<input 
									type="text"
									className="form-control"
									defaultValue={company.name}
									ref={nameRef}
									required/>
							</div>
							<div className="form-group">
								<label>Adress</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.address}
									ref={addressRef}/>
							</div>
							<div className="form-group">
								<label>Välj en kategori</label>
								<select className="form-control" ref={categoryRef} defaultValue={company.category}>
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
									defaultValue={company.info}
									ref={infoRef}></textarea>
							</div>
							<div className="form-group">
								<label>Slug</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.slug}
									ref={slugRef}/>
							</div>
							<div className="form-group">
								<label>Sökord</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.search_term}
									ref={searchTermRef}/>
							</div>
							<div>
								{
									images
									? (images.map(image => (
										<img src={image.url} className="img-thumbnail" alt="" key={image.id}/>
									)))
									: ''
								}
							</div>
							
							<UploadImage company={company} />
							<button disabled={formLoading} type="submit" className="btn btn-primary">Update</button>
						</form>
				</div>
			</div>
		</>
	)
}

export default CompanyEdit
