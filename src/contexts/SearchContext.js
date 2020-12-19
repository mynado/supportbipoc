import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchContext = React.createContext()

const SearchProvider = (props) => {
	const [companies, setCompanies] = useState(null)
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState(null)
	const navigate = useNavigate()
	const search = useLocation().search;
	const query = new URLSearchParams(search).get('q');

	const getCompanies = (query) => {
		const unsubscribe = db.collection('companies')
		.where('search_term', 'array-contains', query)
		.orderBy('name')
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
	}
	
	const handleChange = (e) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getCompanies(searchQuery)
		let currentUrlParams = new URLSearchParams(window.location.search);
		currentUrlParams.set('q', searchQuery);
		navigate(window.location.pathname + "?" + currentUrlParams.toString());
	}

	useEffect(() => {
		if (query) {
			getCompanies(query)
			let currentUrlParams = new URLSearchParams(window.location.search);
			currentUrlParams.set('q', query);
			navigate(window.location.pathname + "?" + currentUrlParams.toString());
		} else {
			return
		}
	}, [query])


	const contextValues = {
		loading,
		companies,
		searchQuery,
		handleChange,
		handleSubmit
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