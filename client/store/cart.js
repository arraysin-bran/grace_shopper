import axios from 'axios'

// consider revising thunk names
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
const showCart = () => ({type: SHOW_CART})
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
const clearCart = () => ({type: CLEAR_CART})

/**
 * THUNK CREATORS
 */

export const add = (productId, userId) => async dispatch => {
  try {
    if (!userId) {
      // guest cart in local storage
      const product = await axios.get(`/api/products/${productId}`)
      dispatch(addToCart(product))
    } else {
      // user cart on server
      const res = await axios.post(`/api/carts/${userId}`, productId)
      dispatch(addToCart(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const remove = (productId, userId) => async dispatch => {
  console.log('redux console')
  try {
    if (!userId) {
      const product = await axios.get(`/api/products/${productId}`)
      dispatch(removeFromCart(product))
    } else {
      const res = await axios.delete(`/api/carts/${userId}/${productId}`)
      dispatch(removeFromCart(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}
export const clear = userId => async dispatch => {
  try {
    if (!userId) {
      dispatch(clearCart())
    } else {
      await axios.delete(`/api/carts/${userId}`)
      dispatch(clearCart())
    }
  } catch (err) {
    console.error(err)
  }
}
export const cart = () => dispatch => {
  try {
    dispatch(showCart())
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CART:
      return {...state}
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item !== action.product)
      }
    case CLEAR_CART:
      return {...state, cart: []}
    default:
      return state
  }
}

export default reducer
