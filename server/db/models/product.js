const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjA0oTazNPlAhWOjVkKHWS9AlsQjRx6BAgBEAQ&url=https%3A%2F%2Fzelda.gamepedia.com%2FRupee&psig=AOvVaw06BHBA-7GoYbyMWc897BrM&ust=1573061442491189' //add an images folder and update this value
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
