import React, { useEffect } from 'react'
import './App.css'
import {
	Header,
	Home,
	Checkout,
	Login,
	ForgotPassword,
	ResetPassword,
	Register,
	Payment,
	Orders,
} from './components/index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(
	'pk_test_51Keyd9SDlYEApd2WOtbJ20BdtWXR1v0g6h4jFlvPL0wrHqPJH1JQSFjAOSQiCDovmeV4lbFi64avFUYrcP4TxdOH00lcb6AmOs'
)

function App() {
	const [{}, dispatch] = useStateValue()

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch({
					type: 'SET_USER',
					user: user,
				})
			} else {
				dispatch({
					type: 'SET_USER',
					user: null,
				})
			}
		})
	}, [])

	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route exact path='/'>
						<Header />
						<Home />
					</Route>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/register'>
						<Register />
					</Route>
					<Route exact path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route exact path='/payment'>
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route exact path='/orders'>
						<Header />
						<Orders />
					</Route>
					<Route exact path='/forgot-password'>
						<ForgotPassword />
					</Route>
					<Route exact path='/reset-password'>
						<ResetPassword />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
