import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { HiOutlinePhone, HiLink, HiOutlineMail } from 'react-icons/hi'
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
				{
					company.address && (
						<>
							<h2>Adress</h2>
							<p>{company.address}</p>
						</>
					)
				}
				<div className="company-page-info-details">
					{
						company.opening_hours && (
							<small className="company-page-opening-hours">
								<h2>Öppettider</h2>
								{
									company.opening_hours.monday === company.opening_hours.friday ? (
										<ul>
											<li className="company-list-item">
												<span>Måndag - Fredag</span> 
												<span>{company.opening_hours.monday}</span>
											</li>
											<li className="company-list-item">
												<span>Lördag</span> 
												<span>{company.opening_hours.saturday}</span>
											</li>
											<li className="company-list-item">
												<span>Söndag</span>
												<span>{company.opening_hours.sunday}</span>
											</li>
										</ul>
									) : (
										<ul>
											<li className="company-list-item">
												<span>Måndag</span> 
												<span>{company.opening_hours.monday}</span>
											</li>
											<li className="company-list-item">
												<span>Tisdag</span> 
												<span>{company.opening_hours.tuesday}</span>
											</li>
											<li className="company-list-item">
												<span>Onsdag</span> 
												<span>{company.opening_hours.wednesday}</span>
											</li>
											<li className="company-list-item">
												<span>Torsdag</span> 
												<span>{company.opening_hours.thursday}</span>
											</li>
											<li className="company-list-item">
												<span>Fredag</span> 
												<span>{company.opening_hours.friday}</span>
											</li>
											<li className="company-list-item">
												<span>Lördag</span>
												<span>{company.opening_hours.saturday}</span>
											</li>
											<li className="company-list-item">
												<span>Söndag</span> 
												<span>{company.opening_hours.sunday}</span>
											</li>
										</ul>
									)
								}
							</small>
						)
					}
					{
						company.phone || company.email || company.website ? (
							<small className="company-page-contact">
								<h2>Kontakt</h2>
								<ul>
									{company.phone && (
										<li className="company-list-item">
											<span><HiOutlinePhone /></span>
											<span>{company.phone}</span>
										</li>
									)}
									{company.email && (
										<li className="company-list-item">
											<span><HiOutlineMail /></span>
											<span>{company.email}</span>
										</li>
									)}
									{company.website && (
										<li className="company-list-item">
											<span><HiLink /></span>
											<span><a href={company.website} target="_blank" rel="noopener noreferrer">{company.website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}</a></span>
										</li>
									)}
								</ul>
							</small>
						) : ('')
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
