import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Categories.scss'
import restaurantIcon from '../../assets/icons/categories/noodles.svg'
import barberIcon from '../../assets/icons/categories/barber.svg'
import groceriesIcon from '../../assets/icons/categories/grocery-cart.svg'
import fastfoodIcon from '../../assets/icons/categories/falafel.svg'
import carServiceIcon from '../../assets/icons/categories/car-service.svg'
import nailSalonIcon from '../../assets/icons/categories/nail-salon.svg'
import hairSalonIcon from '../../assets/icons/categories/hair-salon.svg'
import clothesIcon from '../../assets/icons/categories/clothes.svg'
import tailorIcon from '../../assets/icons/categories/tailor.svg'

const Categories = () => {
	const location = useLocation()
	const categories = [
		{
			name: 'Restauranger',
			id: 'restaurant',
			icon: restaurantIcon,
		},
		{
			name: 'Barberare',
			id: 'barber',
			icon: barberIcon,
		},
		{
			name: 'Livsmedelsbutik',
			id: 'grocery',
			icon: groceriesIcon,
		},
		{
			name: 'Snabbmat',
			id: 'fast-food',
			icon: fastfoodIcon,
		},
		{
			name: 'Hårsalong',
			id: 'hair-salon',
			icon: hairSalonIcon,
		},
		{
			name: 'Skräddare',
			id: 'tailor',
			icon: tailorIcon,
		},
		{
			name: 'Mode',
			id: 'fashion',
			icon: clothesIcon,
		},
		{
			name: 'Bilverkstad',
			id: 'car-service',
			icon: carServiceIcon,
		},
		{
			name: 'Nagelsalong',
			id: 'nail-salon',
			icon: nailSalonIcon,
		},
	]

	return (
		<div className="categories-container">
			<ul className={`row categories-list ${location.pathname !== '/' ? 'overflow-style' : ''}`}>
				{
					categories.map(category => (
						<li className="categories-list-item">
							<Link to={`/categories/${category.id}`} className="categories-link">
								<img src={category.icon} className="categories-icon" alt="" />
								{category.name}
							</Link>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default Categories
