import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, geopoint } from '../../firebase'

const AdminAddCompany = () => {
	const addressRef = useRef()
	const categoryRef = useRef()
	const emailRef = useRef()
	const infoRef = useRef()
	const latitudeRef = useRef()
	const longitudeRef = useRef()
	const nameRef = useRef()
	const phoneRef = useRef()
	const searchTermRef = useRef()
	const websiteRef = useRef()

	const mondayRef = useRef()
	const tuesdayRef = useRef()
	const wednesdayRef = useRef()
	const thursdayRef = useRef()
	const fridayRef = useRef()
	const saturdayRef = useRef()
	const sundayRef = useRef()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [slug, setSlug] = useState(null)
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
				email: emailRef.current.value,
				info: infoRef.current.value,
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
				slug: slug,
				search_term: searchTermArray,
				website: websiteRef.current.value,
			})

			navigate(`/companies/${slug}/edit`)
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	const handleSlug = (e) => {
		e.preventDefault()
		setSlug(e.target.value.replace(/\s+/g, '-').replace(/'/g, '').toLowerCase())
	}

	return (
		<div className="card container mt-5">
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
								onChange={handleSlug}
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
							<label>Hemsida</label>
							<input
								type="text"
								className="form-control"
								ref={websiteRef}/>
						</div>
						<div className="form-group">
							<label>Mail</label>
							<input
								type="text"
								className="form-control"
								ref={emailRef}/>
						</div>
						<div className="form-group">
							<label>Telefon</label>
							<input
								type="text"
								className="form-control"
								ref={phoneRef}/>
						</div>
						<div className="form-group">
							<label>Välj en kategori</label>
							<select className="form-control" ref={categoryRef}>
								<option value="barber">Barberare</option>
								<option value="store">Butik</option>
								<option value="grocery">Livsmedelsbutik</option>
								<option value="restaurant">Restaurang</option>
								<option value="salon">Salong</option>
								<option value="fast-food">Snabbmat</option>
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
							<label>Öppettider</label>
							<ul className="opening-hours-list">
								<li className="opening-hours-list-item">
									Måndag: 
									<input 
										type="text" 
										className="form-control"
										ref={mondayRef}/>
								</li>
								<li className="opening-hours-list-item">
									Tisdag: 
									<input 
										type="text" 
										className="form-control"
										ref={tuesdayRef}/>
								</li>
								<li className="opening-hours-list-item">
									Onsdag: 
									<input
										type="text"
										className="form-control"
										ref={wednesdayRef}/>
								</li>
								<li className="opening-hours-list-item">
									Thursday: 
									<input
										type="text"
										className="form-control"
										ref={thursdayRef}/>
								</li>
								<li className="opening-hours-list-item">
									Fredag: 
									<input
										type="text"
										className="form-control"
										ref={fridayRef}/>
								</li>
								<li className="opening-hours-list-item">
									Saturday: 
									<input
										type="text"
										className="form-control"
										ref={saturdayRef}/>
								</li>
								<li className="opening-hours-list-item">
									Sunday: 
									<input
										type="text"
										className="form-control"
										ref={sundayRef}/>
								</li>
							</ul>
						</div>
						<div className="form-group">
							<label>Sökord</label>
							<input
								type="text"
								className="form-control"
								placeholder="ex. mat, malmö, vietnamesisk, hälsa, värnhem"
								ref={searchTermRef}/>
						</div>
						<button disabled={loading} type="submit" className="btn btn-update">Add</button>
					</form>
			</div>
		</div>
	)
}

export default AdminAddCompany
