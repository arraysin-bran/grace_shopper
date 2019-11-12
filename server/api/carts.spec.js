/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Cart, User, Product} = require('../db/models') // if error, check if this works, i am unsure

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  //*****************************************************************************************/
  describe('/api/carts/', () => {
    beforeEach(() => {
      User.create({
        firstName: 'Cody',
        lastName: 'Pug',
        email: 'cody@email.com',
        password: '123'
      })
      User.create({
        firstName: 'Murphy',
        lastName: 'Dog',
        email: 'murphy@email.com',
        password: '123'
      })
      User.create({
        firstName: 'Mighty',
        lastName: 'Cow',
        email: 'mightycow@email.com',
        password: 'rfuuife4u8'
      })
      User.create({
        firstName: 'Death',
        lastName: 'Cultist',
        email: 'deathly@email.com',
        password: 'firefirefire'
      })
      User.create({
        firstName: 'Coolone',
        lastName: 'Freeman',
        email: 'freeone@email.com',
        password: 'funnyahaha'
      })
      /*-----------------------------------------------------------*/
      Product.create({
        name: 'empty jar',
        price: 5,
        description: 'an empty glass jar',
        category: 'item'
      })
      Product.create({
        name: 'slingshot',
        price: 75,
        description: 'used to shoot small projectiles',
        category: 'weapon'
      })
      Product.create({
        name: 'wooden sword',
        price: 35,
        description: 'a branch!',
        category: 'weapon'
      })
      Product.create({
        name: 'bright cloak',
        price: 70,
        description: 'it shimmers in the enemys eye',
        category: 'defense'
      })
      Product.create({
        name: 'mushroom',
        price: 5,
        description: 'the ancients speak of its magic powers',
        category: 'magic'
      })
      Product.create({
        name: 'violin spear',
        price: 250,
        description: 'magical notes pierce the cold hearts of your enemies',
        category: 'weapon'
      })
      /*-----------------------------------------------------------*/
      return Cart.bulkCreate([
        {
          userId: 1,
          productId: 1,
          quantity: 4,
          status: 'OPEN',
          order: null
        },
        {
          userId: 1,
          productId: 2,
          quantity: 70,
          status: 'OPEN',
          order: null
        },
        {
          userId: 2,
          productId: 1,
          quantity: 10,
          status: 'OPEN',
          order: null
        },
        {
          userId: 2,
          productId: 3,
          quantity: 7,
          status: 'OPEN',
          order: null
        },
        {
          userId: 3,
          productId: 4,
          quantity: 1,
          status: 'OPEN',
          order: null
        },
        {
          userId: 3,
          productId: 1,
          quantity: 4,
          status: 'OPEN',
          order: null
        },
        {
          userId: 4,
          productId: 1,
          quantity: 1,
          status: 'OPEN',
          order: null
        },
        {
          userId: 4,
          productId: 6,
          quantity: 2,
          status: 'OPEN',
          order: null
        },
        {
          userId: 5,
          productId: 6,
          quantity: 10,
          status: 'OPEN',
          order: null
        },
        {
          userId: 1,
          productId: 3,
          quantity: 10,
          status: 'OPEN',
          order: null
        },
        {
          userId: 1,
          productId: 4,
          quantity: 10,
          status: 'OPEN',
          order: null
        },
        {
          userId: 1,
          productId: 5,
          quantity: 5000,
          status: 'OPEN',
          order: null
        },
        //CLOSED CARTS
        {
          userId: 1,
          productId: 5,
          quantity: 45,
          status: 'CLOSED',
          order: 'F9OL50V'
        },
        {
          userId: 1,
          productId: 2,
          quantity: 67,
          status: 'CLOSED',
          order: 'F9OL50V'
        },
        {
          userId: 1,
          productId: 3,
          quantity: 8,
          status: 'CLOSED',
          order: 'F9OL50V'
        },
        {
          userId: 1,
          productId: 4,
          quantity: 1,
          status: 'CLOSED',
          order: 'F9OL50V'
        }
      ])
    })
    //*****************************************************************************************/
    it('GET /api/carts returns all open/closed carts', async () => {
      const res = await request(app)
        .get('/api/carts')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0]).to.deep.equal({
        id: 1,
        quantity: 4,
        status: 'OPEN',
        order: null,
        userId: 1,
        productId: 1
      })
    })
    //*****************************************************************************************/
    it('GET /api/carts/:userId returns an array of users products (open status)', async () => {
      const res = await request(app)
        .get(`/api/carts/1`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.products[0].cart).to.deep.equal({
        id: 1,
        quantity: 4,
        status: 'OPEN',
        order: null,
        userId: 1,
        productId: 1
      })
    })
    //*****************************************************************************************/
    it("POST /api/carts/:userId/:productid adds a product to user's cart", async () => {
      let add = {
        userId: 5,
        productId: 4
      }

      const res = await request(app)
        .post(`/api/carts/${add.userId}/${add.productId}`, add)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body).to.deep.equal({
        id: 17,
        quantity: 1,
        status: 'OPEN',
        order: null,
        userId: 5,
        productId: 4
      })
    })

    //*****************************************************************************************/
    xit("PUT /api/carts/:userId/:productid increments a cart product's quantity", async () => {
      let currProduct = {
        userId: 2,
        productId: 1,
        quantity: 10,
        status: 'OPEN',
        order: null
      }

      const res = await request(app)
        .put(`/api/carts/${currProduct.userId}/${currProduct.productId}`)
        .send({quantity: 2})
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body).to.deep.equal({
        id: 3,
        status: 'OPEN',
        order: null,
        productId: 1,
        quantity: 2,
        userId: 2
      })
    })
    //*****************************************************************************************/
    xit("DELETE /api/carts/:userId/productId decrements a cart product's quantity", async () => {
      let delProd = {
        userId: 5,
        productId: 6,
        quantity: 10,
        status: 'OPEN',
        order: null
      }
      let res = await request(app)
        .delete(`/api/carts/${delProd.userId}/${delProd.productId}`)
        .expect(204)

      res = await request(app).get(`/api/carts/${delProd.userId}`)
      expect(res.body).to.be.an('array')
      expect(res.body).to.not.contain(delProd)
    })
    //*****************************************************************************************/
    xit("DELETE /api/carts/:userId clears all products from user's cart", async () => {
      let userId = 1
      let res = await request(app)
        .delete(`/api/carts/${userId}`)
        .expect(204)

      res = await request(app).get(`/api/carts/${userId}`)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(0)
    })
  })
})
