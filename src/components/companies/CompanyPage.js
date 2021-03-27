import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useCompany from '../../hooks/useCompany'
import useImages from '../../hooks/useImages'
import ImageSlider from '../images/ImageSlider'
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
			<div className="company-content-container container">
				<div className="company-image-container">
					<ImageSlider images={images}/>
				</div>
				<div className="company-info-container">
					<h1>{company.name}</h1>
					<p>{company.address}</p>
				</div>
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
