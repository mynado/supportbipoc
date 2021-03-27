import React from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
	return (
		<div className="container">
			<h1>Adminpanel</h1>
			<p>Här kan du lägga till, ta bort och redigera företag.</p>
			<ul>
				<li><Link to="/companies/add">Lägg till företag</Link></li>
				<li><Link to="/companies">Visa alla företag</Link></li>
			</ul>

		</div>
	)
}

export default AdminHome
