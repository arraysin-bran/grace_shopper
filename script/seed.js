'use strict'

const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Dog',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Mighty',
      lastName: 'Cow',
      email: 'mightycow@email.com',
      password: 'rfuuife4u8'
    }),
    User.create({
      firstName: 'Death',
      lastName: 'Cultist',
      email: 'deathly@email.com',
      password: 'firefirefire'
    }),
    User.create({
      firstName: 'Coolone',
      lastName: 'Freeman',
      email: 'freeone@email.com',
      password: 'funnyahaha'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'empty jar',
      price: 5,
      description: 'an empty glass jar',
      category: 'item'
    }),
    Product.create({
      name: 'slingshot',
      price: 75,
      description: 'used to shoot small projectiles',
      category: 'weapon'
    }),
    Product.create({
      name: 'wooden sword',
      price: 35,
      description: 'a branch!',
      category: 'weapon'
    }),
    Product.create({
      name: 'bright cloak',
      price: 70,
      description: 'it shimmers in the enemys eye',
      category: 'defense'
    }),
    Product.create({
      name: 'mushroom',
      price: 5,
      description: 'the ancients speak of its magic powers',
      category: 'magic'
    }),
    Product.create({
      name: 'violin spear',
      price: 250,
      description: 'magical notes pierce the cold hearts of your enemies',
      category: 'weapon'
    })
  ])

  const carts = await Promise.all([
    Cart.create({
      userId: 1,
      productId: 1,
      quantity: 4,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 1,
      productId: 2,
      quantity: 70,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 2,
      productId: 1,
      quantity: 10,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 2,
      productId: 3,
      quantity: 7,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 3,
      productId: 4,
      quantity: 1,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 3,
      productId: 1,
      quantity: 4,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 4,
      productId: 1,
      quantity: 1,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 4,
      productId: 6,
      quantity: 2,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 5,
      productId: 6,
      quantity: 10,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 1,
      productId: 3,
      quantity: 10,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 1,
      productId: 4,
      quantity: 10,
      status: 'Open',
      order: null
    }),
    Cart.create({
      userId: 1,
      productId: 5,
      quantity: 5000,
      status: 'Open',
      order: null
    }),

    //CLOSED CARTS NEED ANOTHER TABLE FOREIGN
    Cart.create({
      userId: 1,
      productId: 5,
      quantity: 45,
      status: 'Closed',
      order: 'F9OL50V'
    }),
    Cart.create({
      userId: 1,
      productId: 2,
      quantity: 67,
      status: 'Closed',
      order: 'F9OL50V'
    }),
    Cart.create({
      userId: 1,
      productId: 3,
      quantity: 8,
      status: 'Closed',
      order: 'F9OL50V'
    }),
    Cart.create({
      userId: 1,
      productId: 4,
      quantity: 1,
      status: 'Closed',
      order: 'F9OL50V'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
