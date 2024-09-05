import React from 'react'
import { useStateValue } from '../../StateProvider'
import './product.css'

function Product({ id, title, image, price, rating }) {
	const [state, dispatch] = useStateValue()

	const addToBasket = () => {
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
				qty: 1,
			},
		})
	}
	return (
		<div className='product'>
			<div className='product__info'>
				<p>{title}</p>
				<p className='product__price'>
					<small>₹</small>
					<strong>{price}</strong>
				</p>
				<div className='product__rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>🌟</p>
						))}
				</div>
			</div>
			<img src={image} alt='' />
			<button onClick={addToBasket}>Add to Cart</button>
		</div>
	)
}

export default Product
