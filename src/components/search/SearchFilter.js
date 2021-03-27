// import { useState, useContext } from 'react'
// import { SearchContext } from '../../contexts/SearchContext'
// import './SearchFilter.scss'

// function SearchFilter() {
//     // const [city, setCity] = useState(null)
//     // const [budget, setBudget] = useState(null)
//     const [category, setCategory] = useState(null)
//     const appContext = useContext(SearchContext)
// 	const { addFilter } = appContext

//     const handleAddFilter = () => {
//         // addFilter(budget, category, city)
//         addFilter(category)
//     }

//     return (
//         <div className="filter-container">
//             <div className="filter-content">
//                 {/* <div className="filter-city-container">
//                     <h3>Stad</h3>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCity(e.target.value)} type="radio" name="city" value="malmo" />
//                             Malmö
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCity(e.target.value)} type="radio" name="city" value="goteborg" />
//                             Göteborg
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCity(e.target.value)}  type="radio" name="city" value="stockholm" />
//                             Stockholm
//                         </label>
//                     </div>
//                 </div>
//                 <div className="filter-budget-container">
//                     <h3>Prisklass</h3>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setBudget(e.target.value)} type="radio" name="budget" value="budget" />
//                             Budget
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setBudget(e.target.value)} type="radio" name="budget" value="mellanklass" />
//                             Mellanklass
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setBudget(e.target.value)}  type="radio" name="budget" value="lyx" />
//                             Lyx
//                         </label>
//                     </div>
//                 </div> */}
//                 <div className="filter-categories-container">
//                     <h3>Kategorier</h3>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCategory(e.target.value)} type="radio" name="category" value="restaurant" />
//                             Restaurang
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCategory(e.target.value)} type="radio" name="category" value="hairsalon" />
//                             Frisör
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCategory(e.target.value)}  type="radio" name="category" value="bakery" />
//                             Bageri
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCategory(e.target.value)} type="radio" name="category" value="barber" />
//                             Barberare
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCategory(e.target.value)} type="radio" name="category" value="grocery" />
//                             Livsmedelsbutik
//                         </label>
//                     </div>
//                     <div className="radio">
//                         <label>
//                             <input onChange={(e) => setCategory(e.target.value)}  type="radio" name="category" value="shop" />
//                             Butik
//                         </label>
//                     </div>
//                 </div>
//                 <button onClick={handleAddFilter}>Apply filter</button>
//             </div>
//         </div>
//     )
// }

// export default SearchFilter
