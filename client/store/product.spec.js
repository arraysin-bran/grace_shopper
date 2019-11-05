/* global describe beforeEach afterEach it */

import {expect} from 'chai'
//import {me, logout} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {product: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('product', () => {
    it('eventually dispatches the GET_PRODUCT action', async () => {
      const fakeProduct = {productName: 'sword', id: 2}
      mockAxios
        .onGet(`/api/products/${fakeProduct.id}`)
        .replyOnce(200, fakeProduct)
      await store.dispatch(product()) //define product later
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('all products', () => {
    it('eventually dispatches the GET_ALL_PRODUCTS action', async () => {
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

  // Next task after associations are established
  xdescribe('add to cart', () => {
    it('eventually dispatches the ADD_TO_CART action', async () => {
      const fakeProduct = {productName: 'sword', id: 2}
      mockAxios.onGet(`/api/products`).replyOnce(200, fakeProducts)
      await store.dispatch(products()) //define products later
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
      expect(actions[0].product).to.be.deep.equal(fakeProducts)
    })
  })
})
