import React from 'react'
import CurrencyFormat from 'react-currency-format'
import './subtotal.css'
import { useStateValue } from '../../StateProvider'
import { getBasketTotal, getTotalProduct } from '../../reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
	const history = useHistory()
	const [{ basket }, dispatch] = useStateValue()
	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({getTotalProduct(basket)} items):
							<strong>{value}</strong>
						</p>
						<small className='subtotal__gift'>
							<input type='checkbox' />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'₹'}
			/>
			<button onClick={(e) => history.push('/payment')}>
				Procced to Checkout
			</button>
		</div>
	)
}

export default Subtotal
