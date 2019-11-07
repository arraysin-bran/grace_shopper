const db = require('./db')

// register models
require('./models')

const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')

User.belongsToMany(Product, {
  through: {model: Cart, unique: false},
  constraints: false
})
Product.belongsToMany(User, {
  through: {model: Cart, unique: false},
  constraints: false
})

module.exports = db
