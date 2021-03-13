import { useState, useRef, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/icons/logo/logo-outline-web.png'
import './Navigation.scss'

const Navigation = () => {
	const node = useRef();
	const button = useRef();
	const { currentUser, logout } = useAuth()
	const [open, setOpen] = useState(false)

	const handleClickMenu = () => {
		setOpen(!open)
	}

	const handleClickOutside = useCallback((e) => {
		if (node.current.contains(e.target) || button.current.contains(e.target)) {
			return
		}
		setOpen(!open)
	}, [open])

	const handleLogout = () => {
		logout()
		setOpen(!open)
	}

	useEffect(() => {
		if (open) {
		  document.addEventListener("mousedown", handleClickOutside);
		} else {
		  document.removeEventListener("mousedown", handleClickOutside);
		}
	
		return () => {
		  document.removeEventListener("mousedown", handleClickOutside);
		};
	  }, [open, handleClickOutside]);

	return (
		<nav className="navbar navbar-expand-lg fixed-top">
			<div className="container">
				<NavLink to="/" className="navbar-brand">
					<img src={logo} className="navbar-logo" alt="logo" /> 
				</NavLink>
				<button className={`navbar-toggler ${open ? 'open' : ''}` } onClick={handleClickMenu} id="nav-icon" ref={button}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<div className={`navbar-menu fixed-top ${open ? 'menu-open' : 'menu-collapse'}`} ref={node}>
					<div className="navbar-menu-container">
						<ul className="navbar-menu-list">
							{
								currentUser ? (
									<div className="navbar-menu-list-container navbar-admin">
										<li className="nav-item">
											<NavLink to="/admin/home" onClick={handleClickMenu}>
												Adminpanel
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/companies" onClick={handleClickMenu}>
												Visa alla företag
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/admin/add-company" onClick={handleClickMenu}>
												Lägg till företag
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/admin" onClick={handleLogout}>Logout</NavLink>
										</li>
									</div>
								) : (
									<div className="navbar-menu-list-container navbar-user">
										<li className="nav-item">
											<NavLink to="/" onClick={handleClickMenu}>Home <span className="sr-only">(current)</span></NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/categories" onClick={handleClickMenu}>Kategorier <span className="sr-only">(current)</span></NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/about" onClick={handleClickMenu}>Om oss <span className="sr-only">(current)</span></NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/contact" onClick={handleClickMenu}>Kontakt <span className="sr-only">(current)</span></NavLink>
										</li>
									</div>
								)
							}
						</ul>
					</div>
				</div>		
			</div>
		</nav>
	)
}

export default Navigation
