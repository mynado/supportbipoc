import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useCompany = (companyName) => {
	const [company, setCompany] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		db.collection('companies')
		.where('slug', '==', companyName)
		.onSnapshot(snapshot => {
			setLoading(true)
			const snapShotCompanies = []

			snapshot.forEach(doc => {
				snapShotCompanies.push({
					id: doc.id,
					...doc.data(),
				})
			})

			setCompany(snapShotCompanies[0])
			setLoading(false)
		})
	}, [companyName])

	return { company, loading }
}

export default useCompany
