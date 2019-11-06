import {expect} from 'chai'
import reducer, {cart, add, remove, clear} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import 'mock-local-storage'

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

const initialState = {cart: [], currentProduct: {}}

const newState = reducer(initialState, {
  type: 'ADD_TO_CART',
  product: fakeProduct
})

describe('thunk creators', () => {
  let store
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('add to cart', () => {
    it('adds a product to a users cart', async () => {
      mockAxios.onPost(`/api/carts/${fakeUser.id}`).replyOnce(201, fakeProduct)
      await store.dispatch(add(fakeProduct.id, fakeUser.id))
      const actions = store.getActions()
      console.log('add', actions)
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(newState.cart).to.include(fakeProduct)
    })

    it('adds a product to a guest cart', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(add(fakeProduct.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(newState.cart).to.include(fakeProduct)
    })
  })

  describe('remove from cart', () => {
    it('removes item from user cart', async () => {
      mockAxios.onPost(`/api/carts/${fakeUser.id}`).replyOnce(201, fakeProduct)
      await store.dispatch(add(fakeProduct.id, fakeUser.id))
      expect(newState.cart.length).to.be.equal(1)
      mockAxios
        .onPost(`/api/carts/${fakeUser.id}/${fakeProduct.id}`)
        .replyOnce(204)
      await store.dispatch(remove(fakeProduct.id, fakeUser.id))
      const actions = store.getActions()
      console.log('remove', actions)
      expect(actions[0].type).to.be.equal('REMOVE_FROM_CART')
      expect(newState.cart.length).to.be.equal(0) // expect the remove from cart to only remove one of the items if many are added
    })

    xit('removes item from guest cart', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(add(fakeProduct.id))
      const state = store.getState()
      expect(state.cart.length).to.be.equal(1)
      expect(localStorage.cart.length).to.be.equal(1)
      await store.dispatch(remove(fakeProduct.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_FROM_CART')
      expect(state.cart.length).to.be.equal(0)
      expect(localStorage.cart.length).to.be.equal(0)
    })
  })

  describe('clear cart', () => {
    xit('clears a users cart', async () => {
      mockAxios.onPost(`/api/carts/${fakeUser.id}`).replyOnce(201)
      await store.dispatch(clear(fakeUser.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CLEAR_CART')
      expect(newState.cart.length).to.be.equal(0)
    })
    xit('clears a guests cart', async () => {
      await store.dispatch(clear())
      const state = store.getState()
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CLEAR_CART')
      expect(localStorage.cart.length).to.be.equal(0)
      expect(state.cart.length).to.be.equal(0)
    })
  })

  describe('show cart', () => {
    xit('shows a users cart', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(add(fakeProduct.id))
      mockAxios
        .onGet(`/api/products/${fakeProduct2.id}`)
        .replyOnce(200, fakeProduct2)
      mockAxios.onGet(`/api/carts/${fakeUser.id}`).replyOnce(200, fakeUser.cart)
      await store.dispatch(cart(fakeUser.id))
      const actions = store.getActions()
      const state = store.getState()
      expect(actions[0].type).to.be.equal('SHOW_CART')
      expect(state.cart).to.be.deep.equal([fakeProduct, fakeProduct2])
    })

    xit('shows a guest cart', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(add(fakeProduct.id))
      mockAxios
        .onGet(`/api/products/${fakeProduct2.id}`)
        .replyOnce(200, fakeProduct2)
      await store.dispatch(add(fakeProduct2.id))
      await store.dispatch(cart())
      const actions = store.getActions()
      const state = store.getState()
      expect(actions[0].type).to.be.equal('SHOW_CART')
      expect(state.cart).to.be.deep.equal([fakeProduct, fakeProduct2])
      expect(localStorage.cart).to.be.deep.equal([fakeProduct, fakeProduct2])
    })
  })
})
