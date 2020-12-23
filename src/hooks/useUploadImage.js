import { useState, useEffect } from 'react';
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useUploadImage = (image, company) => {
	const [uploadProgress, setUploadProgress] = useState(null)
	const [uploadedImage, setUploadedImage] = useState(null)
	const [error, setError] = useState(null)
	const [isSuccess, setIsSuccess] = useState(false)
	const { currentUser } = useAuth()

	useEffect(() => {
		if (!image) {
			setUploadProgress(null)
			setUploadedImage(null)
			setError(null)
			setIsSuccess(false)

			return
		}

		// reset environment
		setError(null)
		setIsSuccess(false)

		// get image reference
		const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`)

		// upload image to imageRef
		const uploadTask = fileRef.put(image)

		// attach listener for `state_changed-event`
		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100))
		})

		uploadTask.then(async snapshot => {
			// retrieve URL to uploaded image
			const url = await snapshot.ref.getDownloadURL()

			console.log('image', image)
			// add uploaded image to database
			const img = {
				name: image.name,
				owner: currentUser.uid,
				path: snapshot.ref.fullPath,
				size: image.size,
				type: image.type,
				url,
			}

			// get docRef to company (if set)
			if (company.slug) {
				img.company = company.slug
			}

			// add image to collection
			const unsubscribe = await db.collection('images').add(img)
			
			// let user know we're done
			setIsSuccess(true)
			setUploadProgress(null)

			// image has been added to db, refresh list of images
			setUploadedImage(img)
			setIsSuccess(true)
			return ({url, unsubscribe})
		}).catch(error => {
			setError({
				type: 'warning',
				msg: `Image could not be uploaded due to an error (<code>${error.code}</code>)`
			})
		})
	}, [image, currentUser, company])
	
	return {
		uploadProgress,
		uploadedImage,
		error,
		isSuccess
	};
}
 
export default useUploadImage;