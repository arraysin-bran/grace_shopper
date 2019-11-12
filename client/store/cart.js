import axios from 'axios'
import user from './user'

// consider revising thunk names
/**
 * ACTION TYPES
 */
const USER_INPUT_QTY = 'USER_INPUT_QTY'
const INCREMENT_QTY = 'INCREMENT_QTY'
const DECREMENT_QTY = 'DECREMENT_QTY'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const SHOW_CART = 'SHOW_CART'

/**
 * INITIAL STATE
 */

const initialState = {
  cart: []
}

/**
 * ACTION CREATORS
 */
const userInputQty = (productId, quantity) => ({
  type: USER_INPUT_QTY,
  quantity,
  productId
})
const incrementQty = productId => ({type: INCREMENT_QTY, productId})
const decrementQty = productId => ({type: DECREMENT_QTY, productId})
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = productId => ({type: REMOVE_FROM_CART, productId})
const clearCart = () => ({type: CLEAR_CART})
const showCart = openCartProducts => ({type: SHOW_CART, openCartProducts})

/**
 * THUNK CREATORS
 */

export const inputQtyThunk = (
  productId,
  userId,
  quantity,
  loggedIn = false
) => async dispatch => {
  try {
    if (!loggedIn) {
      //localStorage
      // const product = await axios.get(`/api/products/${productId}`) // may need to {product}
      // dispatch(addToCart(product))
    } else {
      // user cart
      const res = await axios.put(
        `/api/carts/${userId}/input/${productId}`,
        quantity
      )
      dispatch(userInputQty(productId, res.data.quantity))
    }
  } catch (err) {
    console.error(err)
  }
}

export const incrementQtyThunk = (
  productId,
  userId,
  loggedIn = false
) => async dispatch => {
  try {
    if (!loggedIn) {
      //localStorage
      // const product = await axios.get(`/api/products/${productId}`) // may need to {product}
      // dispatch(addToCart(product))
    } else {
      // user cart
      await axios.put(`/api/carts/${userId}/add/${productId}`)
      dispatch(incrementQty(productId))
    }
  } catch (err) {
    console.error(err)
  }
}

export const decrementQtyThunk = (
  productId,
  userId,
  loggedIn = false
) => async dispatch => {
  try {
    if (!loggedIn) {
      //localStorage
      // const product = await axios.get(`/api/products/${productId}`) // may need to {product}
      // dispatch(addToCart(product))
    } else {
      // user cart
      await axios.put(`/api/carts/${userId}/remove/${productId}`)
      dispatch(decrementQty(productId))
    }
  } catch (err) {
    console.error(err)
  }
}

export const addToCartThunk = (
  productId,
  userId,
  loggedIn = false
) => async dispatch => {
  try {
    if (!loggedIn) {
      //localStorage
      // const product = await axios.get(`/api/products/${productId}`) // may need to {product}
      // dispatch(addToCart(product))
    } else {
      // user cart
      const res = await axios.post(`/api/carts/${userId}/${productId}`)
      console.log(res)
      // const newCart = await axios.get(`/api/carts/${userId}`)
      // console.log('newCart data', newCart.data)
      dispatch(addToCart(res.data))
      // dispatch(addToCart(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeFromCartThunk = (
  productId,
  userId,
  loggedIn = false
) => async dispatch => {
  try {
    if (!loggedIn) {
      //const product = await axios.get(`/api/products/${productId}`)
      //dispatch(removeFromCart(product))
    } else {
      await axios.delete(`/api/carts/${userId}/${productId}`)
      dispatch(removeFromCart(productId))
    }
  } catch (err) {
    console.error(err)
  }
}

export const clearCartThunk = (userId, loggedIn = false) => async dispatch => {
  try {
    if (!loggedIn) {
      //dispatch(clearCart())
    } else {
      await axios.delete(`/api/carts/${userId}`)
      dispatch(clearCart())
    }
  } catch (err) {
    console.error(err)
  }
}

export const showCartThunk = (userId, loggedIn = false) => async dispatch => {
  console.log('User id passed through thunk: ', userId)
  try {
    if (!loggedIn) {
      //local storage stuff
    } else {
      const res = await axios.get(`/api/carts/${userId}`)
      // console.log('Cart data passed through thunk: ', res.data)
      dispatch(showCart(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
const reducer = (state = initialState, action) => {
  let currentCart
  switch (action.type) {
    case USER_INPUT_QTY: {
      currentCart = [...state.cart].slice(0)
      currentCart = currentCart.map(product => {
        if (product.id === action.productId) {
          product.quantity = action.quantity
        }
      })
      return {...state, cart: currentCart}
    }
    case INCREMENT_QTY:
      currentCart = [...state.cart].slice(0)
      currentCart = currentCart.map(product => {
        if (product.id === action.productId) {
          product.quantity += 1
        }
      })
      return {...state, cart: currentCart}
    case DECREMENT_QTY:
      currentCart = [...state.cart].slice(0)
      currentCart = currentCart.map(product => {
        if (product.id === action.productId) {
          product.quantity -= 1
        }
      })
      return {...state, cart: currentCart}
    case ADD_TO_CART:
      // action.product.price = (action.product.price / 100).toFixed(2)
      return {...state, cart: [...state.cart, action.product]}
      // return {...state, cart: action.product}
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.productId)
      }
    case CLEAR_CART:
      return {...state, cart: []}
    case SHOW_CART: {
      return {...state, cart: action.openCartProducts.products}
    }
    default:
      return state
  }
}

export default reducer
