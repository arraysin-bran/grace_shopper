const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')
module.exports = router

//GET All Carts (all statuses)
router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll()
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

//GET OPEN cart of userId (OPEN only)
router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const data = await User.findByPk(userId, {
      attributes: ['id'],
      include: [
        {
          model: Product,
          through: {
            where: {status: 'OPEN'}
          }
        }
      ]
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

//POST:ADD product to cart
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    //try to find item in cart first
    let productInCart = await Cart.findOne({
      where: {
        status: 'OPEN',
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    //if not in cart, create it
    if (!productInCart) {
      const data = await Cart.create({
        status: 'OPEN',
        userId: req.params.userId,
        productId: req.params.productId
      })
      res.json(data)
    } else {
      throw new Error('Product already in cart.')
    }
  } catch (error) {
    next(error)
  }
})

// inc quantity
router.put('/:userId/add/:productId', async (req, res, next) => {
  try {
    //try to find item in cart first
    let productInCart = await Cart.findOne({
      where: {
        status: 'OPEN',
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    //if not in cart, create it
    if (productInCart) {
      productInCart.increment('quantity', {by: 1})
      res.json(productInCart)
    } else {
      throw new Error('Product not in cart')
    }
  } catch (error) {
    next(error)
  }
})

// decrement quantity
router.put('/:userId/remove/:productId', async (req, res, next) => {
  try {
    //try to find item in cart first
    let productInCart = await Cart.findOne({
      where: {
        status: 'OPEN',
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    //if not in cart, create it
    if (productInCart) {
      productInCart.decrement('quantity', {by: 1})
      res.json(productInCart)
    } else {
      throw new Error('Product not in cart')
    }
  } catch (error) {
    next(error)
  }
})

//PUT:DIRECTLY EDIT quantity of product in cart
router.put('/:userId/input/:productId', async (req, res, next) => {
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

//DELETE ALL user's OPEN products from Cart
router.delete('/:userId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.params.userId,
        status: 'OPEN'
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
