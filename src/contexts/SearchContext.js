import React, { useEffect, useState, useCallback } from 'react'
import { db } from '../firebase'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchContext = React.createContext()

const SearchProvider = (props) => {
	const [companies, setCompanies] = useState(null)
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState(null)
	const [filter, setFilter] = useState(null)
	const navigate = useNavigate()
	const search = useLocation().search;
	const query = new URLSearchParams(search).get('q');

	const getCompanies = (query, order = "name") => {
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
	}

	const sortResults = useCallback(
		(val) => {
			console.log('val', val)
			getCompanies(query, val)
			setUrl(query)
	}, []);

	const setUrl = (query) => {
		let currentUrlParams = new URLSearchParams(window.location.search);
		currentUrlParams.set('q', query);
		navigate(window.location.pathname + "?" + currentUrlParams.toString());
	}
	
	const handleChange = (e) => {
		setSearchQuery(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getCompanies(searchQuery)
		setUrl(searchQuery)
	}

	useEffect(() => {
		if (query) {
			getCompanies(query)
			setUrl(query)
		} else {
			return
		}
	}, [query])


	const contextValues = {
		loading,
		getCompanies,
		companies,
		searchQuery,
		handleChange,
		handleSubmit,
		sortResults,
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