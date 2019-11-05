import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const SHOW_CART = 'SHOW_CART'

/**
 * INITIAL STATE
 */

const initialState = {
  cart: [],
  currentProduct: {}
}

/**
 * ACTION CREATORS
 */
const showCart = cart => ({type: SHOW_CART, cart})
const addToCart = product => ({type: ADD_TO_CART, currentProduct: product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
const clearCart = () => ({type: CLEAR_CART})

/**
 * THUNK CREATORS
 */

export const add = (userId, productId) => async dispatch => {
  try {
    const res = await axios.post(`/api/users/${userId}/cart`, productId)
    dispatch(addToCart(res))
  } catch (err) {
    console.error(err)
  }
}

export const remove = (userId, productId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/${userId}/cart/${productId}`)
    dispatch(removeFromCart(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const clear = userId => async dispatch => {
  try {
    await axios.post(`/api/users/${userId}/cart`)
    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}
export const cart = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/cart`)
    dispatch(showCart(res.data))
  } catch (err) {
    console.error(err)
  }
}
// had to user user cart because cart is defined as a function and there was a scope confluct
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_CART:
      return {...state, cart: action.cart}
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item !== action.product)
      }
    case CLEAR_CART:
      return {...state, cart: []}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    default:
      return state
  }
}
