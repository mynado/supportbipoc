import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useSearch = (searchQuery) => {
	const [companies, setCompanies] = useState([])
	const [loading, setLoading] = useState(true)


	useEffect(() => {
			const unsubscribe = db.collection('companies')
			.where('search_term', 'array-contains', searchQuery)
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
	
			return unsubscribe
	}, [searchQuery])

	return { companies, loading }
}

export default useSearch
