import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import useCompany from '../../hooks/useCompany'
import useImages from '../../hooks/useImages'
import ImageSlider from '../images/ImageSlider'
import MapView from '../map/MapView'
import { IoChevronBackSharp } from 'react-icons/io5'
import './CompanyPage.scss'

const CompanyPage = () => {
	const { currentUser } = useAuth()
	const { companyName } = useParams()
	const { company, loading } = useCompany(companyName)
	const { images } = useImages(company)
	const navigate = useNavigate()

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<div className="company-page-content-container">
				<div className="company-page-image-container">
					<ImageSlider images={images}/>
				</div>
				<div className="company-page-info-container">
					<div className="button-container">
						{
							currentUser && (
									<Link to={`/companies/${company.slug}/edit`} className="btn btn-custom"><FiEdit /></Link>
							)
						}
						<button onClick={() => navigate(-1)} className="btn btn-custom"><IoChevronBackSharp /></button>
					</div>
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
									<p>{company.address}</p>
								</small>
							)
						}
					</div>
				</div>
				<div className="map-wrapper">
					<MapView companies={[company]} page={'company-page'}/>
				</div>
			</div>
		</>
	)
}

export default CompanyPage
