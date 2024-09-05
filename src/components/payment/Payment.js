import React, { useState } from 'react'
import './payment.css'
import { useStateValue } from '../../StateProvider'
import { CheckoutProduct } from '../index'
import { Link } from 'react-router-dom'
import { Card, Crypto } from '../index'

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue()

	const [paymentOption, setPaymentOption] = useState('Card')

	const onRadioChange = (e) => {
		setPaymentOption(e.target.value)
	}

	return (
		<div className='payment'>
			<div className='payment__container'>
				<h1>
					Checkout (<Link to='/checkout'>{basket?.length} items</Link>
					)
				</h1>

				{/* Payment section - delivery address */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment__address'>
						<p>{user?.displayName}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>

				{/* Payment section - Review Items */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment__items'>
						{basket.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
								qty={item.qty}
							/>
						))}
					</div>
				</div>

				{/* Payment section - Payment method */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment__content'>
						<div className='radio_buttons'>
							<label>
								<input
									type='radio'
									value='Card'
									checked={paymentOption === 'Card'}
									onChange={onRadioChange}
									name='Card'
								/>
								Card Payment
							</label>
							<label>
								<input
									type='radio'
									value='Crypto'
									checked={paymentOption === 'Crypto'}
									onChange={onRadioChange}
									name='Crypto'
								/>
								Crypto Payment
							</label>
						</div>
						{paymentOption === 'Card' ? <Card /> : <Crypto />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payment
