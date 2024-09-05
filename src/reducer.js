export const initialState = {
	basket: [],
	user: null,
}

export const getBasketTotal = (basket) =>
	basket?.reduce((amount, item) => item.price * item.qty + amount, 0)

export const getTotalProduct = (basket) =>
	basket?.reduce((qty, item) => item.qty + qty, 0)

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_BASKET':
			const item = state.basket.find(
				(product) => product.id === action.item.id
			)
			if (item) {
				return {
					...state,
					basket: state.basket.map((item) =>
						item.id === action.item.id
							? {
									...item,
									qty: item.qty + 1,
							  }
							: item
					),
				}
			} else {
				return {
					...state,
					basket: [...state.basket, action.item],
				}
			}

		case 'REMOVE_FROM_BASKET':
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			)
			let newBasket = [...state.basket]

			if (index >= 0) {
				newBasket.splice(index, 1)
			} else {
				console.warn(
					`Cant remove product (id: ${action.id}) as its not in basket!`
				)
			}
			return {
				...state,
				basket: newBasket,
			}

		case 'MINUS_PRODUCT_QTY':
			const item1 = state.basket.find(
				(product) => product.id === action.item.id
			)

			if (item1) {
				return {
					...state,
					basket: state.basket.map((item1) =>
						item1.id === action.item.id
							? {
									...item1,
									qty:
										item1.qty > 0
											? item1.qty - 1
											: item1.qty,
							  }
							: item1
					),
				}
			}
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			}

		case 'EMPTY_BASKET':
			return {
				...state,
				basket: [],
			}

		default:
			return state
	}
}

export default reducer
