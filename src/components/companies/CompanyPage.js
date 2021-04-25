import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useCompany from '../../hooks/useCompany'
import useImages from '../../hooks/useImages'
import ImageSlider from '../images/ImageSlider'
import MapView from '../map/MapView'
import './CompanyPage.scss'

const CompanyPage = () => {
	const { currentUser } = useAuth()
	const { companyName } = useParams()
	const { company, loading } = useCompany(companyName)
	const { images, imgLoading } = useImages(company)
	const navigate = useNavigate()

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<div className="company-page-content-container container">
				<div className="company-page-image-container">
					<ImageSlider images={images}/>
				</div>
				<div className="company-page-info-container">
					<h1>{company.name}</h1>
					<p>{company.info}</p>
					<div className="company-page-info-details">
						{
							company.opening_hours && (
								<small className="company-page-opening-hours">
									<h5>Öppettider</h5>
									<ul>
										<li>Måndag: {company.opening_hours.monday}</li>
										<li>Tisdag: {company.opening_hours.tuesday}</li>
										<li>Onsdag: {company.opening_hours.wednesday}</li>
										<li>Torsdag: {company.opening_hours.thursday}</li>
										<li>Fredag: {company.opening_hours.friday}</li>
										<li>Lördag: {company.opening_hours.saturday}</li>
										<li>Söndag: {company.opening_hours.sunday}</li>
									</ul>
								</small>
							)
						}
						{
							company.address && (
								<small className="company-page-address">
									<h5>Adress</h5>
									<ul>
										<li>{company.address.street}</li>
										<li>{company.address.zip} {company.address.city}</li>
										<li>{company.address.area}</li>
									</ul>
								</small>
							)
						}
					</div>
				</div>
				<MapView companies={[company]} page={'company-page'}/>
			</div>

			<div className="button-container d-flex justify-content-between">
				<button onClick={() => navigate(-1)} className="btn button-custom">&laquo; Back</button>
				{
				currentUser && (
					<div className="mt-3">
						<Link to={`/companies/${company.slug}/edit`} className="btn btn-primary">Ändra</Link>
					</div>
				)
			}
			</div>
		</>
	)
}

export default CompanyPage
