import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useCompany = (companyName) => {
	const [images, setImages] = useState([])
	const [company, setCompany] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db.collection('companies')
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

		return unsubscribe
	}, [companyName])

	useEffect(() => {
		const unsubscribe = db.collection('images')
			.where('company', '==', companyName)
			.onSnapshot(snapshot => {
				setLoading(true)
				const imgs = [];

				snapshot.forEach(doc => {
					imgs.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setImages(imgs);
				setLoading(false)
			});

		return unsubscribe;
	}, [companyName]);

	return { company, images, loading }
}

export default useCompany
