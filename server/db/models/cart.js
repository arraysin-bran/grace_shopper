const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define(
  'cart',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Must be a non-negative number'
        },
        notEmpty: true
      }
    },
    status: {
      type: Sequelize.ENUM('OPEN', 'CLOSED'),
      defaultValue: 'OPEN'
    },
    order: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
)

module.exports = Cart
