import React from 'react'
import './SearchFilter.scss'

function SearchFilter() {
    return (
        <div className="filter-container">
            <div className="filter-content">
                <div className="filter-city-container">
                    <h3>Stad</h3>
                    <ul>
                        <li>Göteborg</li>
                        <li>Malmö</li>
                        <li>Stockholm</li>
                    </ul>
                </div>
                <div className="filter-budget-container">
                    <h3>Prisklass</h3>
                    <ul>
                        <li>Budget</li>
                        <li>Mellanklass</li>
                        <li>Lyx</li>
                    </ul>
                </div>
                <div className="filter-categories-container">
                    <h3>Kategorier</h3>
                    <ul>
                        <li>Restaurang</li>
                        <li>Frisör</li>
                        <li>Bageri</li>
                        <li>Barberare</li>
                        <li>Livsmedelsbutik</li>
                        <li>Konditori</li>
                        <li>Butik</li>
                        <li>Bilservice</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter
