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
		<div className={`company-page-content-container ${ currentUser ? 'remove-whitespace' : '' }`}>
			<div className="company-page-image-container">
				<ImageSlider images={images}/>
			</div>
			<div className="company-page-info-container">
				<div className="button-container">
					<button onClick={() => navigate(-1)} className="btn btn-custom button-back"><IoChevronBackSharp /></button>
					{
						currentUser && (
								<Link to={`/companies/${company.slug}/edit`} className="btn btn-custom"><FiEdit /></Link>
						)
					}
				</div>
				<h1>{company.name}</h1>
				<p>{company.info}</p>
				<div className="company-page-info-details">
					{
						company.opening_hours && (
							<small className="company-page-opening-hours">
								<h2>Öppettider</h2>
								{
									company.opening_hours.monday === company.opening_hours.friday ? (
										<ul>
											<li>Måndag - Fredag: {company.opening_hours.monday}</li>
											<li>Lördag: {company.opening_hours.saturday}</li>
											<li>Söndag: {company.opening_hours.sunday}</li>
										</ul>
									) : (
										<ul>
											<li>Måndag: {company.opening_hours.monday}</li>
											<li>Tisdag: {company.opening_hours.tuesday}</li>
											<li>Onsdag: {company.opening_hours.wednesday}</li>
											<li>Torsdag: {company.opening_hours.thursday}</li>
											<li>Fredag: {company.opening_hours.friday}</li>
											<li>Lördag: {company.opening_hours.saturday}</li>
											<li>Söndag: {company.opening_hours.sunday}</li>
										</ul>
									)
								}
							</small>
						)
					}
					{
						company.address && (
							<small className="company-page-address">
								<h2>Kontakt</h2>
								<ul>
									<li>Adress: {company.address}</li>
									<li>Telefon: {company.phone}</li>
									<li>Mail: {company.email}</li>
									<li>Hemsida: <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}</a></li>
								</ul>
							</small>
						)
					}
				</div>
			</div>
			<div className="map-wrapper">
				<MapView companies={[company]} page={'company-page'}/>
			</div>
		</div>
	)
}

export default CompanyPage
