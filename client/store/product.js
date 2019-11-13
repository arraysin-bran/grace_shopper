import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */

const initialState = {
  products: [],
  currentProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})

/**
 * THUNK CREATORS
 */

export const product = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const products = () => async dispatch => {
  try {
    const res = await axios.get(`/api/products`)
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT: {
      action.product.price = (action.product.price / 100).toFixed(2)
      return {...state, currentProduct: action.product}
    }
    case GET_ALL_PRODUCTS: {
      let correctedPriceProds = action.products.map(currentProduct => {
        currentProduct.price = (currentProduct.price / 100).toFixed(2)
        return currentProduct
      })
      return {...state, products: correctedPriceProds}
    }
    default:
      return state
  }
}
