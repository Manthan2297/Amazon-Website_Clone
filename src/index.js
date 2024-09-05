import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { StateProvider } from './StateProvider'
import reducer, { initialState } from './reducer'

import { TransactionsProvider } from './components/context/TransactionContext'

ReactDOM.render(
	<TransactionsProvider>
		<React.StrictMode>
			<StateProvider initialState={initialState} reducer={reducer}>
				<App />
			</StateProvider>
		</React.StrictMode>
	</TransactionsProvider>,
	document.getElementById('root')
)

reportWebVitals()
