import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import cart from './cart'
import {loadCart, saveCart} from './localStorage'

const reducer = combineReducers({user, products: product, carts: cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const guestCart = loadCart() // loads all items in guest cart
const store = createStore(reducer, guestCart, middleware) // adds the local storage guest cart to the store

store.subscribe(() => {
  saveCart(store.getState().cart)
})
export default store
export * from './user'
