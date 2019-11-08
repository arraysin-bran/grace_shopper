const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    console.log('AXIOS ID IN: ', req.params.id)
    const id = req.params.id
    const product = await Product.findByPk(id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
