import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useCompany from '../../hooks/useCompany'
import useImages from '../../hooks/useImages'

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
		<div>
			<div>
				{
					images
					? (images.map(image => (
						<img src={image.url} className="img-thumbnail" alt="" key={image.id}/>
					)))
					: ''
				}
			</div>
			<h1>{company.name}</h1>
			<p>{company.address}</p>

			<div className="d-flex justify-content-between">
				<button onClick={() => navigate(-1)} className="btn btn-primary">&laquo; Back</button>
				{
				currentUser && (
					<div className="mt-3">
						<Link to={`/companies/${company.slug}/edit`} className="btn btn-primary">Ändra</Link>
					</div>
				)
			}
			</div>
		</div>
	)
}

export default CompanyPage