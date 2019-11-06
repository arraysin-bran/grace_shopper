/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart') // if error, check if this works, i am unsure

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/carts/', () => {
    const cart = {
      quantity: 30,
      status: open,
      userId: 3,
      productId: 5
    }

    beforeEach(() => {
      return Cart.create(cart)
    })

    it('GET /api/carts', async () => {
      const res = await request(app)
        .get('/api/carts')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(cart)
    })

    it(' /api/carts/:userId', async () => {
      const res = await request(app)
        .get('/api/carts')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(cart)
    })

    it('POST /api/carts/:userId', async () => {
      const res = await request(app)
        .get('/api/carts')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(cart)
    })

    it('DELETE /api/carts/:userId', async () => {
      const res = await request(app)
        .get('/api/carts')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(cart)
    })
  })
})
