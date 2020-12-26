import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useImages = (company) => {
	const [images, setImages] = useState([])
	const [imgLoading, setImgLoading] = useState(true)

	useEffect(() => {
		if (!company) {
			return
		}
		const unsubscribe = db.collection('images')
			.where('company', '==', db.collection('companies').doc(company.id))
			.onSnapshot(snapshot => {
				setImgLoading(true)
				const imgs = [];

				snapshot.forEach(doc => {
					imgs.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setImages(imgs);
				setImgLoading(false)
			});

		return unsubscribe;
	}, [company]);

	return { images, imgLoading }
}

export default useImages
