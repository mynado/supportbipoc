import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Categories.scss'
import restaurantIcon from '../../assets/icons/categories/noodles.svg'
import barberIcon from '../../assets/icons/categories/barber.svg'
import groceriesIcon from '../../assets/icons/categories/grocery-cart.svg'
import fastfoodIcon from '../../assets/icons/categories/falafel.svg'

const Categories = () => {
	const location = useLocation()

	return (
		<div className="categories-container container">
			<ul className={`row categories-list ${location.pathname !== '/' ? 'overflow-style' : ''}`}>
				<li className="col-6 categories-list-item">
					<Link to="/categories/restaurant">
						<img src={restaurantIcon} className="categories-icon" alt="" /> Restauranger
					</Link>
				</li>
				<li className="col-6 categories-list-item">
					<Link to="/categories/barber">
						<img src={barberIcon} className="categories-icon" alt="" /> Barber
					</Link>
				</li>
				<li className="col-6 categories-list-item">
					<Link to="/categories/livsmedelsbutik">
						<img src={groceriesIcon} className="categories-icon" alt="" /> Livsmedel
					</Link>
				</li>
				<li className="col-6 categories-list-item">
					<Link to="/categories/fast-food">
						<img src={fastfoodIcon} className="categories-icon" alt="" /> Snabbmat
					</Link>
				</li>
				<li className="col-6 categories-list-item">
					<Link to="/categories/fast-food">
						<img src={fastfoodIcon} className="categories-icon" alt="" /> Snabbmat
					</Link>
				</li>
				<li className="col-6 categories-list-item">
					<Link to="/categories/fast-food">
						<img src={fastfoodIcon} className="categories-icon" alt="" /> Snabbmat
					</Link>
				</li>
				<li className="col-6 categories-list-item">
					<Link to="/categories/fast-food">
						<img src={fastfoodIcon} className="categories-icon" alt="" /> Snabbmat
					</Link>
				</li>
				<li className="col-6 categories-list-item">
					<Link to="/categories/fast-food">
						<img src={fastfoodIcon} className="categories-icon" alt="" /> Snabbmat
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default Categories
