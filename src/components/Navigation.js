import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../assets/scss/App.scss'

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
		<div className={open ? 'menu-open' : 'menu-collapse'} id="navbarNav">
				<span onClick={handleClickMenu}>X</span>
				<ul className="navbar-nav">
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
			<nav className="navbar navbar-expand-lg">
				<div className="container">
					<NavLink to="/" className="navbar-brand">
						Fuck Your Fusion
					</NavLink>

					<button className="navbar-toggler" onClick={handleClickMenu}>
						<span>Menu</span>
					</button>
				</div>
			</nav>
			

		</>
	)
}

export default Navigation
