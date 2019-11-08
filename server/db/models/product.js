const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'images/rupee.png'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING //could also do enum?
  }
  // to be added in later tier:
  // stock: {
  //   type: Sequelize.INTEGER
  // }
})

module.exports = Product
