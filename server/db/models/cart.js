const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Open'
  }
})

module.exports = Cart
