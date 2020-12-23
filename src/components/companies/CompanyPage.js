import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useCompany from '../../hooks/useCompany'

const CompanyPage = () => {
	const { currentUser } = useAuth()
	const { companyName } = useParams()
	const { company, loading } = useCompany(companyName)
	const navigate = useNavigate()

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<div>
			<h1>{company.name}</h1>
			<p>{company.address}</p>

			<div className="d-flex justify-content-between">
				<button onClick={() => navigate(-1)} className="btn btn-primary">&laquo; Back</button>
				{
				currentUser && (
					<div className="mt-3">
						<Link to="/admin/edit-company" className="btn btn-primary">Ändra</Link>
					</div>
				)
			}
			</div>
		</div>
	)
}

export default CompanyPage
