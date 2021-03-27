import React, { useEffect, useState, useCallback } from 'react'
import { db } from '../firebase'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchContext = React.createContext()

const SearchProvider = (props) => {
	const [companies, setCompanies] = useState(null)
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState(null)
	// const [filter, setFilter] = useState(null)
	const navigate = useNavigate()
	const search = useLocation().search;
	const query = new URLSearchParams(search).get('q');

	const getCompanies = useCallback ((query, order = "name") => {
		const unsubscribe = db.collection('companies')
		.where('search_term', 'array-contains', query)
		.orderBy(order)
		.onSnapshot(snapshot => {
			setLoading(true)
			const snapShotCompanies = []

			snapshot.forEach(doc => {
				snapShotCompanies.push({
					id: doc.id,
					...doc.data(),
				})
			})

			setCompanies(snapShotCompanies)
			setLoading(false)
		})
		navigate('/search')
		return unsubscribe
	}, [navigate])

	const setUrl = useCallback ((query) => {
		let currentUrlParams = new URLSearchParams(window.location.search);
		currentUrlParams.set('q', query);
		navigate("/search?" + currentUrlParams.toString());
	}, [navigate])

	const sortResults = useCallback(
		(val) => {
			getCompanies(query, val)
			setUrl(query)
	}, [getCompanies, query, setUrl]);
	
	const handleChange = (e) => {
		setSearchQuery(e.target.value.toLowerCase())
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getCompanies(searchQuery)
		setUrl(searchQuery)
		// if (filter) {
		// 	console.log('with filter and search query', filter, searchQuery)
		// 	searchByCategory(filter)
		// 	setUrl(searchQuery)
		// } else {
		// 	console.log('without filter', searchQuery)
		// 	getCompanies(searchQuery)
		// 	setUrl(searchQuery)
		// }
	}

	// const addFilter = (category) => {
	// 	if (category) {
	// 		setFilter(category)
	// 	}
	// }

	useEffect(() => {
		if (query) {
			getCompanies(query)
			setUrl(query)
		} else {
			return
		}
	}, [query, setUrl, getCompanies])


	const contextValues = {
		loading,
		getCompanies,
		companies,
		searchQuery,
		handleChange,
		handleSubmit,
		sortResults,
		// addFilter,
	}
	
	return (
		<SearchContext.Provider value={contextValues}>
			{props.children}
		</SearchContext.Provider>
	)
}

export {
	SearchContext,
	SearchProvider
}