/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Pug',
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('/api/users/:userId', () => {
    beforeEach(() => {
      return User.bulkCreate([
        {
          firstName: 'Cody',
          lastName: 'Pug',
          email: 'cody@puppybook.com'
        },
        {
          firstName: 'Ms.',
          lastName: 'Sourpuss',
          email: 'feisty@hotmail.com'
        }
      ])
    })

    it('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.lastName).to.be.equal('Sourpuss')
    })
  }) // end describe('/api/users/:userId')
}) // end describe('User routes')
