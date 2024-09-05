import React from 'react'
import { useStateValue } from '../../StateProvider'
import './checkout.css'
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi'

function CheckoutProduct({ id, image, title, price, rating, qty, hideButton }) {
	const [{ basket }, dispatch] = useStateValue()

	const removeFromBasket = () => {
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id,
		})
	}

	const plusQty = () => {
		dispatch({
			type: 'ADD_TO_BASKET',
			item: {
				id: id,
			},
		})
	}
	const minusQty = () => {
		dispatch({
			type: 'MINUS_PRODUCT_QTY',
			item: {
				id: id,
			},
		})
	}

	return (
		<div className='checkoutProduct'>
			<img className='checkoutProduct__image' src={image} />
			<div className='checkoutProduct__info'>
				<p className='checkoutProduct__title'>{title}</p>
				<p className='checkoutProduct__price'>
					<small>₹</small>
					<strong>{price}</strong>
				</p>
				<div className='checkoutProduct__rating'>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>🌟</p>
						))}
				</div>
				<div className='product__qty'>
					{!hideButton && (
						<FiMinusCircle
							className='button__minus'
							onClick={minusQty}
						/>
					)}

					<input
						className='product__qty__value'
						type='text'
						value={qty}
					/>
					{!hideButton && (
						<FiPlusCircle
							className='button__plus'
							onClick={plusQty}
						/>
					)}
				</div>
				{!hideButton && (
					<button onClick={removeFromBasket}>
						Remove from Basket
					</button>
				)}
			</div>
		</div>
	)
}

export default CheckoutProduct
