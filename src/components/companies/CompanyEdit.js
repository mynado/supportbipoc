import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { db } from '../../firebase'
import useCompany from '../../hooks/useCompany'
import useImages from '../../hooks/useImages'
import useDeleteImage from '../../hooks/useDeleteImage'
import UploadImage from '../images/UploadImage'
import './CompanyEdit.scss'

const CompanyEdit = () => {
	const addressRef = useRef()
	const categoryRef = useRef()
	const infoRef = useRef()
	const nameRef = useRef()
	const emailRef = useRef()
	const phoneRef = useRef()
	const searchTermRef = useRef()
	const thumbnailUrlRef = useRef()
	const websiteRef = useRef()
	
	const mondayRef = useRef()
	const tuesdayRef = useRef()
	const wednesdayRef = useRef()
	const thursdayRef = useRef()
	const fridayRef = useRef()
	const saturdayRef = useRef()
	const sundayRef = useRef()

	const { companyName } = useParams()
	const { company, loading } = useCompany(companyName)
	const { images } = useImages(company)
	const [deleteImage, setDeleteImage] = useState(null)
	const [formLoading, setFormLoading] = useState(false)
	const [error, setError] = useState(false)
	const [thumbnailImage, setThumbnailImage] = useState(null)
	useDeleteImage(deleteImage)
	const navigate = useNavigate()

	if (loading) {
		return (<p>Loading...</p>)
	}

	const handleDeleteImage = (e, image) => {
		e.preventDefault()
		if (window.confirm(`Are you really sure you want to delete the image\n"${image.name}"?`)) {
			setDeleteImage(image);
		}
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
				email: emailRef.current.value,
				opening_hours: {
					monday: mondayRef.current.value,
					tuesday: tuesdayRef.current.value,
					wednesday: wednesdayRef.current.value,
					thursday: thursdayRef.current.value,
					friday: fridayRef.current.value,
					saturday: saturdayRef.current.value,
					sunday: sundayRef.current.value,
				},
				phone: phoneRef.current.value,
				search_term: searchTermArray,
				thumbnail_url: thumbnailUrlRef.current.value,
				website: websiteRef.current.value,
			})

			navigate(`/companies/${company.slug}`)
		} catch (e) {
			setError(e.message)
			setFormLoading(false)
		}

	}

	const handleThumbnailImage = (e, image) => {
		e.preventDefault()
		setThumbnailImage(image)
		thumbnailUrlRef.current.value = image.url
	}

	return (
		<div className="company-edit-container">
			<div className="card company-edit-card">
				<div className="card-body">
					<h2>{company.name}</h2>
						{error && (<div className="alert alert-danger">{error}</div>)}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label>Företagsnamn</label>
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
								<label>Hemsida</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.website}
									ref={websiteRef}/>
							</div>
							<div className="form-group">
								<label>Mail</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.email}
									ref={emailRef}/>
							</div>
							<div className="form-group">
								<label>Telefon</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.phone}
									ref={phoneRef}/>
							</div>
							<div className="form-group">
								<label>Välj en kategori</label>
								<select className="form-control" ref={categoryRef} defaultValue={company.category}>
									<option value="barber">Barberare</option>
									<option value="grocery">Livsmedelsbutik</option>
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
								<label>Öppettider</label>
								<ul className="opening-hours-list">
									<li className="opening-hours-list-item">
										Måndag: 
										<input 
											type="text" 
											className="form-control" 
											defaultValue={company.opening_hours && company.opening_hours.monday ? company.opening_hours.monday : ''} ref={mondayRef}/>
									</li>
									<li className="opening-hours-list-item">
										Tisdag: 
										<input 
											type="text" 
											className="form-control" 
											defaultValue={company.opening_hours && company.opening_hours.tuesday ? company.opening_hours.tuesday : ''} ref={tuesdayRef}/>
									</li>
									<li className="opening-hours-list-item">
										Onsdag: 
										<input
											type="text"
											className="form-control"
											defaultValue={company.opening_hours && company.opening_hours.wednesday ? company.opening_hours.wednesday : ''} ref={wednesdayRef}/>
									</li>
									<li className="opening-hours-list-item">
										Thursday: 
										<input
											type="text"
											className="form-control"
											defaultValue={company.opening_hours && company.opening_hours.thursday ? company.opening_hours.thursday : ''} ref={thursdayRef}/>
									</li>
									<li className="opening-hours-list-item">
										Fredag: 
										<input
											type="text"
											className="form-control"
											defaultValue={company.opening_hours && company.opening_hours.friday ? company.opening_hours.friday : ''} ref={fridayRef}/>
									</li>
									<li className="opening-hours-list-item">
										Saturday: 
										<input
											type="text"
											className="form-control"
											defaultValue={company.opening_hours && company.opening_hours.saturday ? company.opening_hours.saturday : ''} ref={saturdayRef}/>
									</li>
									<li className="opening-hours-list-item">
										Sunday: 
										<input
											type="text"
											className="form-control"
											defaultValue={company.opening_hours && company.opening_hours.sunday ? company.opening_hours.sunday : ''} ref={sundayRef}/>
									</li>
								</ul>
							</div>
							<div className="form-group">
								<label>Sökord</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.search_term}
									ref={searchTermRef}/>
							</div>
							<div className="form-group">
								<label>Omslagsbild</label>
								<input
									type="text"
									className="form-control"
									defaultValue={company.thumbnail_url}
									ref={thumbnailUrlRef}/>
							</div>
							{
								images && (
									<>
										<p>Välj omslagsbild</p>
										<div className="thumbnail-images-container">
											{
												images
												? (images.map(image => (
													<div key={image.id} className="image-wrapper">
														<img src={image.url} className="img-thumbnail" alt=""/>
														<div className="edit-button-container">
															<button className="btn btn-custom" onClick={(e) => handleThumbnailImage(e, image)}>{thumbnailImage === image ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
															</button>
															<button className="btn btn-custom" onClick={(e) => {handleDeleteImage(e, image)}}><RiDeleteBin6Line /></button>
														</div>
													</div>
												)))
												: ''
											}
										</div>
									</>
								)
							}
							
							
							<UploadImage company={company} />
							<button disabled={formLoading} type="submit" className="btn btn-update">Update</button>
						</form>
				</div>
			</div>
		</div>
	)
}

export default CompanyEdit
