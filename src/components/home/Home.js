import React from 'react'
import './home.css'
import { Product } from '../index'

function home() {
	return (
		<div className='home'>
			<div className='home__container'>
				<img
					className='home__image'
					src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
					alt='Prime Video'
				/>
				<div className='home__row'>
					<Product
						id='123456'
						title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback'
						price={29.9999}
						image='https://images-na.ssl-images-amazon.com/images/I/51aEhyjQGrL._SX316_BO1,204,203,200_.jpg'
						rating={5}
					/>
					<Product
						id='1234567'
						title='Noise ColorFit Ultra Smart Watch with 1.75" HD Display, Aluminium Alloy Body, 60 Sports Modes, Spo2, Lightweight, Stock Market Info, Calls & SMS Reply (Vintage Brown)'
						price={50}
						image='https://m.media-amazon.com/images/I/610w8MWCkwL._SX679_.jpg'
						rating={5}
					/>
				</div>
				<div className='home__row'>
					<Product
						id='12345678'
						title='Echo Dot (3rd Gen, Black) + Wipro 9W LED Smart Color Bulb combo - Works with Alexa - Smart Home starter kit'
						price={40}
						image='https://m.media-amazon.com/images/I/61EXU8BuGZL._SX679_.jpg'
						rating={5}
					/>
					<Product
						id='123456789'
						title='2021 Apple iPad Pro with Apple M1 chip (11-inch/27.96 cm, Wi-Fi, 128GB) - Space Grey (3rd Generation)'
						price={150}
						image='https://m.media-amazon.com/images/I/81Y5WuARqpS._SX679_.jpg'
						rating={5}
					/>
					<Product
						id='1234569'
						title='Apple iPhone 13 Pro (128GB) - Sierra Blue'
						price={1200}
						image='https://m.media-amazon.com/images/I/61jLiCovxVL._SX679_.jpg'
						rating={5}
					/>
				</div>
				<div className='home__row'>
					<Product
						id='1234568'
						title='Samsung 34 inch (86.4 cm) LED Curved Computer Monitor - Full HD, Super Slim,VA Panel,HDR 10 - LC34G55TWWWXXL (Black)'
						price={1250}
						image='https://m.media-amazon.com/images/I/71it2biogSS._SX679_.jpg'
						rating={5}
					/>
				</div>
			</div>
		</div>
	)
}

export default home
