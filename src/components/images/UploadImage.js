import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import useUploadImage from '../../hooks/useUploadImage'
import './UploadImage.scss'

const UploadImage = (props) => {
	const [uploadImage, setUploadImage] = useState(null)
	const [message, setMessage] = useState(null)
	const { error, isSuccess } = useUploadImage(uploadImage, props.company)
	
	useEffect(() => {
		if (error) {
			setMessage({
				type: 'error',
				text: error,
			})
		} else if (isSuccess) {
			setMessage({
				success: true,
				text: 'Image successfully uploaded!',
			})
			setUploadImage(null);
		} else {
			setMessage(null)
		}
	
	}, [error, isSuccess])

	const onDrop = useCallback(acceptedFiles => {
		if (acceptedFiles.length === 0) {
			return
		}

		setUploadImage(acceptedFiles[0])
	}, [])

	const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject } = useDropzone({ 
		accept: 'image/gif, image/jpeg, image/png',
		onDrop 
	})
	return (
		<div {...getRootProps()} id="upload-image-dropzone-wrapper" className={`px-4 py-3 my-3 text-center ${isDragActive ? "drag-active" : "drag-inactive"} ${isDragAccept ? 'drag-accept' : ``} ${isDragReject ? 'drag-reject' : ``}`}>
			<input {...getInputProps()}/>
			{
				isDragActive 
					? isDragAccept ? <p>Drop it like it's hot! 🔥🔫</p> : <p>We don't want that file! 😨</p>
					: <p className="upload-image-dropzone-text">Drop your files here!</p>
			}

			{
				acceptedFiles && (
					<div className="accepted-files mt-2">
						<ul className="list-unstyled">
							{
								acceptedFiles.map(file => (
									<li key={file.name}>
										<img src={URL.createObjectURL(file)} className="img-fluid w-25" alt="preview"/>
										<small>{file.name} ({Math.round(file.size / 1024)} kb)</small>
									</li>
								))
							}
						</ul>
						
					</div>
				)
			}
			{
				message && (
					<div className="alert alert-warning">
						{message.text}
					</div>
				)
			}
		</div>
	)
}

export default UploadImage
