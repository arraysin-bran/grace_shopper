const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

//GET All Carts (all statuses)
router.get('/', async (req, res, next) => {
  try {
    const users = await Cart.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET OPEN cart of userId (OPEN only)
router.get('/:userId', async (req, res, next) => {
  try {
    const data = await Cart.findAll({
      where: {
        userId: req.params.userId,
        status: 'OPEN'
      }
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

//POST:ADD product to cart
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    const data = await Cart.create({
      quantity: 1,
      status: 'OPEN',
      userId: req.params.userId,
      productId: req.params.productId
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

//PUT:EDIT quantity of product in cart
router.put('/:userId/:productId', async (req, res, next) => {
  try {
    let product = await Cart.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        status: 'OPEN'
      }
    })
    if (req.body.quantity >= 5000) {
      throw new Error('Max quanity exceeded. Please contact support.') // Security? discuss with team
    }
    if (typeof req.body.quantity != 'number' || req.body.quantity < 1) {
      throw new Error('Quantity must be a number greater than 1')
    }
    if (product) {
      product.quantity = req.body.quantity
      res.status(201).send(product)
    }
  } catch (error) {
    next(error)
  }
})

//DELETE:REMOVE product from cart
router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    let product = await Cart.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        status: 'OPEN'
      }
    })
    if (product) {
      await product.destroy()
      res.sendStatus(204)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (error) {
    next(error)
  }
})

//DELETE ALL users OPEN products from Cart
router.delete('/:userId', async (req, res, next) => {
  const id = req.params.userId
  try {
    const cart = await Cart.findAll({
      where: {
        userId: id,
        status: 'OPEN'
      }
    })
    if (cart) {
      for (let i = 0; i < cart.length; i++) await cart[i].destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
