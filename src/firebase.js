import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyCP-UA3_MK6mVezrhoP4VaR0w2giliVjIY',
	authDomain: 'clone-f6123.firebaseapp.com',
	projectId: 'clone-f6123',
	storageBucket: 'clone-f6123.appspot.com',
	messagingSenderId: '806608370166',
	appId: '1:806608370166:web:f3286d1752aeaddcf32fd7',
	measurementId: 'G-V9282D34DL',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
