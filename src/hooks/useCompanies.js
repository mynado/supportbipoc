import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useCompanies = () => {
	const [companies, setCompanies] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db.collection('companies').orderBy('name').onSnapshot(snapshot => {
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
	}, [])
	return { companies, loading }
}

export default useCompanies
