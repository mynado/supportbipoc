import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/icons/logo/logo-outline-web.png'
import './Navigation.scss'

const Navigation = () => {
	const { currentUser, logout } = useAuth()
	const [open, setOpen] = useState(false)

	const handleClickMenu = () => {
		setOpen(!open)
		console.log(open)
	}

	const handleLogout = () => {
		logout()
	}
	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container">
					<NavLink to="/" className="navbar-brand">
					<img src={logo} className="navbar-logo" alt="logo" /> 
					</NavLink>

					<button className={`navbar-toggler ${open ? 'open' : ''}` } onClick={handleClickMenu} id="nav-icon">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
			</nav>
			<div className={`navbar-mobile ${open ? 'menu-open' : 'menu-collapse'}`}>
				<div className="navbar-mobile-container">
					<ul className="navbar-mobile-list">
						{
							currentUser ? (
								<div className="navbar-admin">
									<li className="nav-item">
										<NavLink to="/admin/home">
											Adminpanel
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink to="/companies">
											Visa alla företag
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink to="/admin/add-company">
											Lägg till företag
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink to="/admin" onClick={handleLogout}>Logout</NavLink>
									</li>
								</div>
							) : (
								<div className="navbar-user">
									<li className="nav-item active">
										<NavLink to="/">Home <span className="sr-only">(current)</span></NavLink>
									</li>
									<li className="nav-item active">
										<NavLink to="/">Kategorier <span className="sr-only">(current)</span></NavLink>
									</li>
									<li className="nav-item active">
										<NavLink to="/">Om oss <span className="sr-only">(current)</span></NavLink>
									</li>
									<li className="nav-item active">
										<NavLink to="/">Kontakt <span className="sr-only">(current)</span></NavLink>
									</li>
								</div>

							)
						}
					</ul>
				</div>
			</div>			
		</>
	)
}

export default Navigation
