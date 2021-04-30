import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useClickOutside from '../../hooks/useClickOutside'
import logo from '../../assets/icons/logo/logo-outline-web.png'
import './Navigation.scss'
import SearchBar from '../search/SearchBar'
import Categories from '../categories/Categories'

const Navigation = () => {
	const node = useRef();
	const button = useRef();
	const location = useLocation()
	const { currentUser, logout } = useAuth()
	const [open, setOpen] = useState(false)
	const [scroll, setScroll] = useState(false)

	const listenScrollEvent = e => {
		if (window.scrollY > 30) {
			setScroll(true)
		} else {
			setScroll(false)
		}
	}

	const handleClickMenu = () => {
		setOpen(!open)
	}	

	useClickOutside(node, () => {
		if (open) {
			setOpen(!open)
		}
	});

	const handleLogout = () => {
		logout()
		setOpen(!open)
	}

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent)
	  }, []);

	return (
		<>
			<nav className="navbar navbar-expand-lg">
				{ 
					currentUser 
						? (<NavLink to="/admin/home" className="navbar-brand">
								<img src={logo} className="navbar-logo" style={scroll ? {width: '120px'} : {width: '220px'}} alt="logo" /> 
							</NavLink>)
						: (<NavLink to="/" className="navbar-brand">
								<img src={logo} className="navbar-logo" style={scroll ? {width: '120px'} : {width: '220px'}} alt="logo" /> 
							</NavLink>)
				}
				<button className={`navbar-toggler` } style={scroll ? {width: '30px', height: '24px'} : {}} onClick={handleClickMenu} id="nav-icon" ref={button}>
					<span style={scroll ? {top: '0', height: '5px'} : {}}></span>
					<span style={scroll ? {top: '8px', height: '5px'} : {}}></span>
					<span style={scroll ? {top: '8px', height: '5px'} : {}}></span>
					<span style={scroll ? {top: '16px', height: '5px'} : {}}></span>
				</button>
				<div className={`navbar-menu fixed-top ${open ? 'menu-open' : 'menu-collapse'}`} ref={node}>
					<div className="navbar-menu-container">
						<button className={`navbar-toggler open` } style={scroll ? {width: '30px', height: '24px'} : {}} onClick={handleClickMenu} id="nav-icon" ref={button}>
							<span style={scroll ? {top: '0', height: '5px'} : {}}></span>
							<span style={scroll ? {top: '8px', height: '5px'} : {}}></span>
							<span style={scroll ? {top: '8px', height: '5px'} : {}}></span>
							<span style={scroll ? {top: '16px', height: '5px'} : {}}></span>
						</button>
						<ul className="navbar-menu-list" style={scroll ? {fontSize: '1rem'} : {fontSize: '1.25rem'}}>
							{
								currentUser ? (
									<div className="navbar-menu-list-container">
										<li className="nav-item">
											<NavLink to="/companies" onClick={() => setOpen(false)}>
												Företag
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/companies/add" onClick={() => setOpen(false)}>
												Lägg till företag
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/admin" onClick={handleLogout}>Logout</NavLink>
										</li>
									</div>
								) : (
									<div className="navbar-menu-list-container">
										<li className="nav-item">
											<NavLink to="/" onClick={() => setOpen(false)}>Home <span className="sr-only">(current)</span></NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/about" onClick={() => setOpen(false)}>Om oss <span className="sr-only">(current)</span></NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/contact" onClick={() => setOpen(false)}>Kontakt <span className="sr-only">(current)</span></NavLink>
										</li>
									</div>
								)
							}
						</ul>
					</div>
				</div>
			</nav>
			<div className="whitespace"></div>
			{(!currentUser && location.pathname !== '/admin') 
				? (
					<>
						<SearchBar open={open} />
						{location.pathname !== '/' && <Categories />}
					</>
				) : ''}
		</>
	)
}

export default Navigation
