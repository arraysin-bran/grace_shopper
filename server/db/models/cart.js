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
    type: Sequelize.STRING, //Maybe bool/enum?
    defaultValue: 'Open'
  },
  order: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Cart
