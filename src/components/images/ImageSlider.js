import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import './ImageSlider.scss'

const ImageSlider = (props) => {
	return (
		<Carousel showThumbs={false} showStatus={false} dynamicHeight={true}>
			{
				props.images
				? (props.images.map(image => (
					<div className="slider-image" key={image.id}>
						<img src={image.url} className="img-thumbnail" alt=""/>
					</div>
				)))
				: ''
			}
		</Carousel>
	)
}

export default ImageSlider



