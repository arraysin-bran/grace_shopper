const db = require('./db')

// register models
require('./models')

const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')

User.belongsToMany(Product, {through: Cart})
Product.belongsTo(User, {through: Cart})

module.exports = db
