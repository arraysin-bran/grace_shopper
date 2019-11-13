// all x'ed tests are an issue with checking dispatches from store.getAction,
// refer to issue #38 for direction

import {expect} from 'chai'
import reducer, {
  showCartThunk,
  addToCartThunk,
  removeFromCartThunk,
  clearCartThunk
} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

let mockLocalStorage = {
  cart: []
}

global.window = {localStorage: mockLocalStorage}
window.localStorage = global.localStorage

const fakeProduct = {productName: 'sword', id: 2}
const fakeProduct2 = {productName: 'sling shot', id: 1}
const fakeUser = {
  id: 1,
  firstName: 'cody',
  lastName: 'curtis',
  email: 'cody.gmail.com'
}

const initialState = {cart: []}

describe('thunk creators', () => {
  let store
  let mockAxios
  let newState

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    newState = reducer(initialState, {
      type: 'ADD_TO_CART',
      productId: fakeProduct.id,
      userId: 1,
      loggedIn: true
    })
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('add to cart', () => {
    xit('adds a product to a users/guest cart', () => {
      expect(newState.cart).to.include(fakeProduct)
    })

    xit('dispatch the ADD_TO_CART action for a user', async () => {
      mockAxios.onPost(`/api/carts/${fakeUser.id}`).replyOnce(201, fakeProduct)
      await store.dispatch(addToCartThunk(fakeProduct.id, fakeUser.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
    })

    xit('dispatch the ADD_TO_CART action for a guest', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(addToCartThunk(fakeProduct.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
    })
  })

  describe('remove single product from cart', () => {
    xit('removes item from user/guest cart', () => {
      expect(newState.cart.length).to.be.equal(1)
      newState = reducer(newState, {
        type: 'ADD_TO_CART',
        productId: fakeProduct2.id,
        userId: 1,
        loggedIn: true
      })
      expect(newState.cart.length).to.be.equal(2)
      const removedState = reducer(newState, {
        type: 'REMOVE_FROM_CART',
        productId: fakeProduct.id,
        userId: 1,
        loggedIn: true
      })
      expect(removedState.cart.length).to.be.equal(1)
    })

    xit('dispatch REMOVE_FROM_CART for user', async () => {
      mockAxios.onPost(`/api/carts/${fakeUser.id}`).replyOnce(201, fakeProduct)
      await store.dispatch(addToCartThunk(fakeProduct.id, fakeUser.id))
      expect(newState.cart.length).to.be.equal(1)
      mockAxios
        .onPost(`/api/carts/${fakeUser.id}/${fakeProduct.id}`)
        .replyOnce(204)
      await store.dispatch(removeFromCartThunk(fakeProduct.id, fakeUser.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_FROM_CART')
      expect(newState.cart.length).to.be.equal(0) // expect the remove from cart to only remove one of the items if many are added
    })

    xit('dispatches REMOVE_FROM_CART for guest', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(addToCartThunk(fakeProduct.id))
      const state = store.getState()
      expect(state.cart.length).to.be.equal(1)
      expect(localStorage.cart.length).to.be.equal(1)
      await store.dispatch(removeFromCartThunk(fakeProduct.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_FROM_CART')
      expect(state.cart.length).to.be.equal(0)
      expect(localStorage.cart.length).to.be.equal(0)
    })
  })

  describe('clear cart', () => {
    it('clears a users/guest cart', () => {
      expect(newState.cart.length).to.be.equal(1)
      newState = reducer(newState, {
        type: 'ADD_TO_CART',
        productId: fakeProduct2.id,
        userId: 1,
        loggedIn: true
      })
      expect(newState.cart.length).to.be.equal(2)
      const clearedState = reducer(newState, {
        type: 'CLEAR_CART'
      })
      expect(clearedState.cart.length).to.be.equal(0)
    })
    xit('dispatches CLEAR_CART for a user', async () => {
      mockAxios.onPost(`/api/carts/${fakeUser.id}`).replyOnce(201)
      await store.dispatch(clearCartThunk(fakeUser.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CLEAR_CART')
      expect(newState.cart.length).to.be.equal(0)
    })
    xit('dispatches CLEAR_CART for a guest', async () => {
      await store.dispatch(clearCartThunk())
      const state = store.getState()
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CLEAR_CART')
      expect(localStorage.cart.length).to.be.equal(0)
      expect(state.cart.length).to.be.equal(0)
    })
  })

  describe('show cart', () => {
    xit('shows a users/guest cart', () => {
      expect(newState.cart.length).to.be.equal(1)
      newState = reducer(newState, {
        type: 'ADD_TO_CART',
        productId: fakeProduct2.id,
        userId: 1,
        loggedIn: true
      })
      expect(newState.cart.length).to.be.equal(2)
      const cartState = reducer(newState, {
        type: 'SHOW_CART',
        userId: 1,
        loggedIn: true
      })
      expect(cartState).to.be.deep.equal(newState.cart)
    })

    xit('dispatches SHOW_CART for a user', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(addToCartThunk(fakeProduct.id))
      mockAxios
        .onGet(`/api/products/${fakeProduct2.id}`)
        .replyOnce(200, fakeProduct2)
      mockAxios.onGet(`/api/carts/${fakeUser.id}`).replyOnce(200, fakeUser.cart)
      await store.dispatch(showCartThunk(fakeUser.id))
      const actions = store.getActions()
      const state = store.getState()
      expect(actions[0].type).to.be.equal('SHOW_CART')
      expect(state.cart).to.be.deep.equal([fakeProduct, fakeProduct2])
    })

    xit('dispatches SHOW_CART for a guest', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(addToCartThunk(fakeProduct.id))
      mockAxios
        .onGet(`/api/products/${fakeProduct2.id}`)
        .replyOnce(200, fakeProduct2)
      await store.dispatch(addToCartThunk(fakeProduct2.id))
      await store.dispatch(showCartThunk())
      const actions = store.getActions()
      const state = store.getState()
      expect(actions[0].type).to.be.equal('SHOW_CART')
      expect(state.cart).to.be.deep.equal([fakeProduct, fakeProduct2])
      expect(localStorage.cart).to.be.deep.equal([fakeProduct, fakeProduct2])
    })
  })
})
