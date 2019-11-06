import {expect} from 'chai'
import {cart, add, remove, clear} from './cart'
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

  describe('add to cart', () => {
    it('eventually dispatches the ADD_TO_CART action', async () => {
      const fakeProduct = {productName: 'sword', id: 2}
      const fakeUser = {
        id: 1,
        name: 'cody',
        email: 'cody.gmail.com',
        cart: [
          {productName: 'sword', id: 2},
          {productName: 'sword', id: 2},
          {productName: 'hat', id: 4}
        ]
      }
      mockAxios
        .onPost(`/api/carts/${fakeUser.id}`) // changed to a post to add to the api
        .replyOnce(201, fakeProduct)
      await store.dispatch(add(fakeUser.id, fakeProduct))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].cart).to.include(fakeProduct) // the cart array should have this product
    })
  })

  describe('remove from cart', () => {
    it('eventually dispatches the REMOVE_FROM_CART action', async () => {
      const fakeProduct = {productName: 'sword', id: 2}
      const fakeUser = {
        id: 1,
        name: 'cody',
        email: 'cody.gmail.com',
        cart: [
          {productName: 'sword', id: 2},
          {productName: 'sword', id: 2},
          {productName: 'hat', id: 4}
        ]
      }
      mockAxios
        .onPost(`/api/carts/${fakeUser.id}/${fakeProduct.id}`)
        .replyOnce(204)
      await store.dispatch(remove(fakeUser.id, fakeProduct)) //define cart later
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_FROM_CART')
      expect(actions[0].cart).to.be.deep.equal([
        {productName: 'sword', id: 2},
        {productName: 'hat', id: 4}
      ]) // expect the remove from cart to only remove one of the items if many are added
    })
  })

  describe('clear cart', () => {
    it('logout: eventually dispatches the CLEAR_CART action', async () => {
      const fakeUser = {
        id: 1,
        name: 'cody',
        email: 'cody.gmail.com',
        cart: [
          {productName: 'sword', id: 2},
          {productName: 'sword', id: 2},
          {productName: 'hat', id: 4}
        ]
      }
      mockAxios.onPost(`/api/carts/${fakeUser.id}`).replyOnce(204)
      await store.dispatch(clear(fakeUser.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CLEAR_CART')
      expect(actions[0].cart).to.deep.equal([])
      expect(history.location.pathname).to.be.equal('/api/products')
    })
  })
  // Next task after associations are established
  describe('show cart', () => {
    it('eventually dispatches the SHOW_CART action', async () => {
      const fakeUser = {
        id: 1,
        name: 'cody',
        email: 'cody.gmail.com',
        cart: [
          {productName: 'sword', id: 2},
          {productName: 'sword', id: 2},
          {productName: 'hat', id: 4}
        ]
      }
      mockAxios.onGet(`/api/carts/${fakeUser.id}`).replyOnce(200, fakeUser.cart)
      await store.dispatch(cart(fakeUser.id)) //define cart later
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SHOW_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeUser.cart)
    })
  })
})
