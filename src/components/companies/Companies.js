import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useCompanies from '../../hooks/useCompanies'
import Company from './Company'

const Companies = () => {
	const { currentUser } = useAuth()
	const { companies, loading } = useCompanies()

	return (
		<div className="container">
			<h2 className="mb-3">All Companies</h2>
			{
				currentUser && (
					<div className="mt-3 mb-3">
						<Link to="/companies/add" className="btn btn-update">Lägg till ett företag</Link>
					</div>
				)
			}
			<div className="row">
			{
				loading
					? (<p>Loading...</p>)
					: (
						companies
						? (companies.map(company => (
							<Company company={company} key={company.id}/>
						)))
						: 'Finns inga företag'
					)
			}
			</div>
		</div>
	)
}

export default Companies
