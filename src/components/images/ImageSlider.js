import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const ImageSlider = (props) => {
	console.log(props)
	return (
		<Carousel showThumbs={false} showStatus={false}>
			{
				props.images
				? (props.images.map(image => (
					<div key={image.id}>
						<img src={image.url} className="img-thumbnail" alt=""/>
					</div>
				)))
				: ''
			}
		</Carousel>
	)
}

export default ImageSlider



