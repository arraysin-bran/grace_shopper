const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// Need to add middleware for logged in users and admins

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const data = await User.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'address']
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// admin privilege!
router.post('/', async (req, res, next) => {
  try {
    const data = await User.create(req.body)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// admin privilege!
router.delete('/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const user = await User.findByPk(userId)
    if (user) {
      await user.destroy()
      res.status(204).send('User record was deleted')
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    next(error)
  }
})
