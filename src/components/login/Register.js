import React, { useState } from 'react'
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import { sendEmailVerification } from 'firebase'

function Register() {
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [status, setStatus] = useState(undefined)

	const register = (e) => {
		e.preventDefault()

		auth.createUserWithEmailAndPassword(email, password)
			.then(
				(user) => {
					// it successfully created a new user with email and password
					sendEmailVerification(user.user)
					if (user !== null) {
						auth.currentUser.updateProfile({ displayName: name })
					}
					auth.signOut()
					setStatus({ type: 'success' })
				},
				setTimeout(() => {
					history.push('/login')
				}, 5000)
			)
			.catch((error) => setStatus({ type: 'error', error }))
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
				<h1>Create Account</h1>
				<form action=''>
					<h5>Your name</h5>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

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
						onClick={register}
						className='login__signInButton'
					>
						Create Your Amazon Account
					</button>
				</form>
				<p>
					By creating an account,you agree to Fake Amazon-clone
					condition's of USE and privacy notice'.
				</p>
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

export default Register
