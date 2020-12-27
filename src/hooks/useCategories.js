import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useCategories = (category) => {
	const [companies, setCompanies] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db.collection('companies')
			.where('category', '==', category)
			.onSnapshot(snapshot => {
				setLoading(true)
				const snapShotcompanies = []

				snapshot.forEach(doc => {
					snapShotcompanies.push({
						id: doc.id,
						...doc.data(),
					})
				})

				setCompanies(snapShotcompanies)
				setLoading(false)
		})

		return unsubscribe
	}, [category])
	return { companies, loading }
}

export default useCategories
