import React, { useState } from 'react'
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import firebase from 'firebase'

function Login() {
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [status, setStatus] = useState(undefined)

	const signIn = (e) => {
		e.preventDefault()
		auth.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth.user.emailVerified === true) {
					history.push('/')
				} else {
					auth.user.sendEmailVerification()
					setStatus({ type: 'success' })
				}
			})
			.catch((error) => setStatus({ type: 'error', error }))
	}

	const googleSignIn = (e) => {
		e.preventDefault()
		const provider = new firebase.auth.GoogleAuthProvider()

		auth.signInWithPopup(provider)
			.then((result) => {
				if (result.user) {
					history.push('/')
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const facebookSignIn = (e) => {
		e.preventDefault()
		const provider = new firebase.auth.FacebookAuthProvider()

		auth.signInWithPopup(provider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user
				if (user) {
					history.push('/')
				}

				// ...
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div className='login'>
			<Link to='/'>
				<img
					className='login__logo'
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
					alt=''
				/>
			</Link>
			<div className='login__container'>
				<h1>Sign-in</h1>
				<form action=''>
					<h5>E-mail</h5>
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<h5>Password</h5>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						type='submit'
						onClick={signIn}
						className='login__signInButton'
					>
						Sign In
					</button>
					<div className='change__password'>
						<Link to='/forgot-password'>
							<p className='login__forgotPassword'>
								Forgot password-?
							</p>
						</Link>
						<Link to='/reset-password'>
							<p className='login__resetpassword'>
								Reset password
							</p>
						</Link>
					</div>
					<div className='or'>
						<h4>or</h4>
					</div>
					<div className='login__other'>
						<FaGoogle onClick={googleSignIn} />
						<FaFacebook onClick={facebookSignIn} />
					</div>
				</form>
				<p>
					By signing-in you agree to the AMAZON FAKE CLONE Conditions
					of Use & Sale. Please see our Privacy Notice, our Cookies
					Notice and our Interest-Based Ads Notice.
				</p>
				<Link to='/register'>
					<button className='login__registerButton'>
						Create Your Amazon Account
					</button>
				</Link>
				{status?.type === 'success' && (
					<div className='verify__email'>
						<p>Verify mail send to your E-mail</p>
					</div>
				)}
				{status?.type === 'error' && <p>Please provide valid E-mail</p>}
			</div>
		</div>
	)
}

export default Login
