import React from 'react'
import './header.css'
import { FaSearch } from 'react-icons/fa'
import { MdShoppingBasket } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { getTotalProduct } from '../../reducer'
import { auth } from '../../firebase'

const Header = () => {
	const [{ basket, user }, dispatch] = useStateValue()

	const handleAuthentication = () => {
		if (user) {
			auth.signOut()
		}
	}

	return (
		<div className='header'>
			<Link to='/'>
				<img
					className='header__logo'
					src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
					alt='amazon'
				/>
			</Link>
			<div className='header__search'>
				<input type='text' className='header__searchInput' />
				<FaSearch className='header__searchIcon' />
			</div>
			<div className='header__nav'>
				<Link to={!user && '/login'}>
					<div
						onClick={handleAuthentication}
						className='header__option'
					>
						<span className='header__optionLineOne'>
							Hello,{user ? user?.displayName : 'Guest'}
						</span>
						<span className='header__optionLineTwo'>
							{user ? 'Sign Out' : 'Sign In'}
						</span>
					</div>
				</Link>
				<Link to='/orders'>
					<div className='header__option'>
						<span className='header__optionLineOne'>Returns</span>
						<span className='header__optionLineTwo'>& Orders</span>
					</div>
				</Link>
				<div className='header__option'>
					<span className='header__optionLineOne'>Your</span>
					<span className='header__optionLineTwo'>Prime</span>
				</div>
				<Link to='/checkout'>
					<div className='header__optionBasket'>
						<MdShoppingBasket />
						<span className='header__basketCount'>
							{getTotalProduct(basket)}
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Header
