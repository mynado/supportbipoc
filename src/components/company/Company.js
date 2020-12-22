import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useCompany from '../../hooks/useCompany'

const Company = () => {
	const { companyName } = useParams()
	const { company, loading } = useCompany(companyName.replace('-', ' '))
	const navigate = useNavigate()

	if (loading) {
		return (<p>Loading...</p>)
	}

	return (
		<div>
			<h1>{company.name}</h1>
			<p>{company.address}</p>

			<div>
				<button onClick={() => navigate(-1)} className="btn btn-primary">&laquo; Go back to search results</button>
			</div>
		</div>
	)
}

export default Company
