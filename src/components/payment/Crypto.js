import React, { useContext, useEffect, useState } from 'react'
import './payment.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider'
import { TransactionContext } from '../context/TransactionContext'
import { getBasketTotal } from '../../reducer'
import { useHistory } from 'react-router-dom'
import { RiArrowUpDownFill } from 'react-icons/ri'
import { FaRupeeSign, FaEthereum } from 'react-icons/fa'

function Crypto() {
	const { connectWallet, sendTransaction } = useContext(TransactionContext)
	const [{ basket }, dispatch] = useStateValue()
	const [login, setLogin] = useState(false)
	const [etherValue, setEtherValue] = useState(0)
	const history = useHistory()
	const toAddress = '0x73dB12D836C55156871D52D2d75E3EF6eA1BA4Bb'

	useEffect(() => {
		const ethValue = getBasketTotal(basket) / 2880

		setEtherValue(ethValue)
	}, [basket])

	const handleSubmit = (e) => {
		connectWallet()
			.then(() => {
				setLogin(true)
			})
			.catch((err) => {
				alert('Not found any account connected, please connect again')
			})
		e.preventDefault()
		const formdata = {
			addressTo: '0x73dB12D836C55156871D52D2d75E3EF6eA1BA4Bb',
			amount: etherValue.toString(),
			keyword: 'product',
			message: 'Purchase Product',
		}
		if (
			!formdata.addressTo ||
			!formdata.amount ||
			!formdata.keyword ||
			!formdata.message
		)
			return
		sendTransaction(formdata).then((response) => {
			history.replace('/orders')
		})
	}

	return (
		<div className='payment__details'>
			<form onSubmit={handleSubmit}>
				<div className='crypto_paymentContainer'>
					<div className='title'>
						<p>Order Total:</p>
					</div>
					<div className='total__value'>
						<CurrencyFormat
							renderText={(value) => (
								<>
									<FaRupeeSign></FaRupeeSign>
									<input readOnly type='text' value={value} />
								</>
							)}
							decimalScale={2}
							value={getBasketTotal(basket)}
							displayType={'text'}
							thousandSeparator={true}
						/>
						<div className='arrow__icon'>
							<RiArrowUpDownFill />
						</div>
						<FaEthereum />
						<input
							name='amount'
							type='number'
							readOnly
							value={etherValue}
						/>
					</div>
					<p>Address To: {toAddress}</p>
					<button type='button' onClick={handleSubmit}>
						{login ? 'Confirm Transaction' : 'Connect Wallet'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Crypto
