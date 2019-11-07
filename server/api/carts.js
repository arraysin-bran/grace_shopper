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

//GET open cart of userId (open only)
router.get('/:userId', async (req, res, next) => {
  try {
    const data = await Cart.findAll({
      where: {
        userId: req.params.userId
        // status: 'Open'
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
    //deconstruct req.body then create
    const data = await Cart.create({
      quantity: 1,
      status: 'Open',
      userId: req.params.userId,
      productId: req.params.productId
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

//PUT:EDIT product in cart
router.put('/:userId/:productId', async (req, res, next) => {
  try {
    let product = await Cart.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        status: 'Open'
      }
    })
    if (product) {
      product.quantity = req.body.quantity
    }
    res.status(201).send(product)
  } catch (error) {
    next(error)
  }
})

//DELETE:REMOVE product from cart
router.delete('/:userId/:productId', async (req, res, next) => {
  //not sure how to work this yet
  try {
    let product = await Cart.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId,
        status: 'Open'
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

//DELETE ALL users open products from Cart
router.delete('/:userId', async (req, res, next) => {
  const id = req.params.userId
  try {
    const cart = await Cart.findAll({
      where: {
        userId: id,
        status: 'Open'
      }
    })
    if (cart) {
      for (let i = 0; i < cart.length; i++) await cart[i].destroy()
      res.send(204)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (error) {
    next(error)
  }
})
