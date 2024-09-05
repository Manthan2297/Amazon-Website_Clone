import React, { useEffect, useState } from 'react'
import './payment.css'
import axios from '../../axios'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider'
import { getBasketTotal } from '../../reducer'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase'

function Card() {
	const [{ basket, user }, dispatch] = useStateValue()
	const history = useHistory()

	const stripe = useStripe()
	const elements = useElements()

	const [succeeded, setSucceeded] = useState(false)
	const [processing, setProcessing] = useState('')
	const [error, setError] = useState(null)
	const [disabled, setDisabled] = useState(true)
	const [clientSecret, setClientSecret] = useState('')

	useEffect(() => {
		const getClientSecret = async () => {
			const response =
				basket &&
				(await axios({
					method: 'post',
					url: `/payments/create?total=${parseInt(
						getBasketTotal(basket) * 100
					)}`,
				}))
			setClientSecret(response.data.clientSecret)
		}
		getClientSecret()
	}, [basket])

	const handleCart = async (e) => {
		e.preventDefault()
		setProcessing(true)

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(async ({ paymentIntent }) => {
				// paymentIntent = payment confirmation

				db.collection('users')
					.doc(user?.uid)
					.collection('orders')
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					})
				setSucceeded(true)
				setError(null)
				setProcessing(false)

				dispatch({
					type: 'EMPTY_BASKET',
				})

				history.replace('/orders')
			})
	}

	const handleDetail = (event) => {
		setDisabled(event.empty)
		setError(event.error ? event.error.message : '')
	}

	return (
		<div className='payment__details'>
			<form onSubmit={handleCart}>
				<CardElement className='card' onChange={handleDetail} />

				<div className='payment__priceContainer'>
					<CurrencyFormat
						renderText={(value) => <h3>Order Total: {value}</h3>}
						decimalScale={2}
						value={getBasketTotal(basket)}
						displayType={'text'}
						thousandSeparator={true}
						prefix={'₹'}
					/>
					<button
						disabled={
							!user ||
							processing ||
							disabled ||
							succeeded ||
							!getBasketTotal(basket)
						}
					>
						<span>
							{processing ? <p>Processing</p> : 'Buy Now'}
						</span>
					</button>
					<span>
						This Payment methos is now under maintanance,Please
						refer other Payment option
					</span>
				</div>

				{/* Errors */}
				{error && <div>{error}</div>}
			</form>
		</div>
	)
}

export default Card
