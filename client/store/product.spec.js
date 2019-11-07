/* global describe beforeEach afterEach it */

// all x'ed tests are an issue with checking dispatches from store.getAction,
// refer to issue #40 for direction

import {expect} from 'chai'
import reducer, {product, products} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  products: [],
  currentProduct: {}
}
const fakeProduct = {productName: 'sword', id: 2}
const fakeProducts = [
  {productName: 'sword', id: 2},
  {productName: 'sling-shot', id: 1},
  {productName: 'sheild', id: 4}
]

describe('thunk creators', () => {
  let store
  let mockAxios
  let newState

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    newState = reducer(initialState, {
      type: 'GET_PRODUCT',
      product: fakeProduct
    })
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('product', () => {
    it('sets current product to the selected product', () => {
      expect(newState.currentProduct).to.be.deep.equal(fakeProduct)
    })
    xit('dispatches GET_PRODUCT for user', async () => {
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(product())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('all products', () => {
    it('sets products to all products', () => {
      newState = {
        type: 'GET_ALL_PRODUCTS',
        products: fakeProducts
      }
      expect(newState.products).to.be.deep.equal(fakeProducts)
    })
    xit('eventually dispatches the GET_ALL_PRODUCTS action', async () => {
      const fakeProducts = [
        {productName: 'sword', id: 2},
        {productName: 'elixir', id: 50}
      ]
      mockAxios.onGet(`/api/products`).replyOnce(200, fakeProducts)
      await store.dispatch(products()) //define products later
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
      expect(actions[0].product).to.be.deep.equal(fakeProducts)
    })
  })
})
