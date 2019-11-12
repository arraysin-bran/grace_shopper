'use strict'

const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.bulkCreate([
      {
        firstName: 'Cody',
        lastName: 'Pug',
        email: 'cody@email.com',
        password: '123',
        streetAddress: '1 Dog Lane',
        city: 'New York',
        state: 'NY',
        zipCode: '11201'
      },
      {
        firstName: 'Murphy',
        lastName: 'Dog',
        email: 'murphy@email.com',
        password: '123'
      },
      {
        firstName: 'Mighty',
        lastName: 'Cow',
        email: 'mightycow@email.com',
        password: 'rfuuife4u8'
      },
      {
        firstName: 'Death',
        lastName: 'Cultist',
        email: 'deathly@email.com',
        password: 'firefirefire'
      },
      {
        firstName: 'Coolone',
        lastName: 'Freeman',
        email: 'freeone@email.com',
        password: 'funnyahaha'
      }
    ])
  ])

  const products = await Promise.all([
    Product.bulkCreate([
      {
        imageUrl: '/images/monster-extract.png',
        name: 'Monster Extract',
        price: 900,
        description:
          "A result of Kilton's research into monsters, this suspicious spice can be used to punch up dishes while cooking. Apparently it can be used to make a number of monstrous meals.",
        category: 'Cooking'
      },
      {
        imageUrl: '/images/wooden-mop.png',
        name: 'Wooden Mop',
        price: 1900,
        description:
          'Just a mop to the untrained eye, it excels at tiding up the place. But it owes its sturdy construction to a true craftsman, so it actually has some combat merit.',
        category: 'Weapon'
      },
      {
        imageUrl: '/images/bokoblin-mask.png',
        name: 'Bokoblin Mask',
        price: 9900,
        description:
          "Kilton's handmade Bokoblin headgear. It's almost charming in a cute, monstrous kind of way... Equip it to blend in with Bokoblins.",
        category: 'Apparel'
      },
      {
        imageUrl: '/images/moblin-mask.png',
        name: 'Moblin Mask',
        price: 19900,
        description:
          "Kilton's handmade Moblin headgear. It's designed to replicate the Moblin's distinct long nose and large horn. Equip it to blend in with Moblins.",
        category: 'Apparel'
      },
      {
        imageUrl: '/images/spring-loaded-hammer.png',
        name: 'Spring-Loaded Hammer',
        price: 19900,
        description:
          "This strange hammer is one of Kilton's specialties. Being struck by it doesn't hurt much, but the fourth swing in a string of attacks will send the victim flying.",
        category: 'Weapon'
      },
      {
        imageUrl: '/images/lizalfos-mask.png',
        name: 'Lizalfos Mask',
        price: 29900,
        description:
          "Kilton's handmade Lizalfos headgear. It's designed to replicate the unique tongue and horn of the Lizalfos. Equip it to blend in with Lizalfos.",
        category: 'Apparel'
      },
      {
        imageUrl: '/images/monster-saddle.png',
        name: 'Monster Saddle',
        price: 29900,
        description:
          'Kilton hand made this saddle. Apparently he had some sort of monstrous horse in mind as he worked on it. It looks strange but is certainly usable.',
        category: 'Horse'
      },
      {
        imageUrl: '/images/monster-bridle.png',
        name: 'Monster Bridle',
        price: 39900,
        description:
          "This bridle was handmade by Kilton, but it looks like he may have hand some monstrous horse in mind when he made it. It includes a mask that conceals the horse's head.",
        category: 'Horse'
      },
      {
        imageUrl: '/images/lynel-mask.png',
        name: 'Lynel Mask',
        price: 99900,
        description:
          "Kilton's handmade Lynel headgear. It's so well crafted, it can deceive a real Lynel. Equip it to blend in with Lynels, but don't linger too long. Those beasts are smart.",
        category: 'Apparel'
      },
      {
        imageUrl: '/images/empty-bottle.png',
        name: 'Empty Bottle',
        price: 500,
        description:
          'An empty glass jar. Hold potions, milk, bugs, letters, fairies, and more!',
        category: 'Item'
      },
      {
        imageUrl: '/images/fairy-slingshot.png',
        name: 'Fairy Slingshot',
        price: 5000,
        description: 'Used to shoot small projectiles.',
        category: 'Weapon'
      },
      {
        imageUrl: '/images/master-sword-replica.png',
        name: 'Master Sword (Replica)',
        price: 7000,
        description:
          'Become the Hero of Time with this super snazzy Master Sword Replica!\n\nDisclaimer: This is not the real Master Sword, please stop sending your minions to our store, Ganon.',
        category: 'Weapon'
      },
      {
        imageUrl: '/images/hylian-shield.png',
        name: 'Hylian Shield',
        price: 89900,
        description:
          'A shield passed down through the Hyrulean royal family. Its defensive capabilities and durability outshine all other shields.',
        category: 'Armor'
      }
    ])
  ])

  const carts = await Promise.all([
    Cart.bulkCreate([
      {
        userId: 1,
        productId: 1,
        quantity: 4,
        status: 'OPEN',
        order: null
      },
      {
        userId: 1,
        productId: 2,
        quantity: 70,
        status: 'OPEN',
        order: null
      },
      {
        userId: 2,
        productId: 1,
        quantity: 10,
        status: 'OPEN',
        order: null
      },
      {
        userId: 2,
        productId: 3,
        quantity: 7,
        status: 'OPEN',
        order: null
      },
      {
        userId: 3,
        productId: 4,
        quantity: 1,
        status: 'OPEN',
        order: null
      },
      {
        userId: 3,
        productId: 1,
        quantity: 4,
        status: 'OPEN',
        order: null
      },
      {
        userId: 4,
        productId: 1,
        quantity: 1,
        status: 'OPEN',
        order: null
      },
      {
        userId: 4,
        productId: 6,
        quantity: 2,
        status: 'OPEN',
        order: null
      },
      {
        userId: 5,
        productId: 6,
        quantity: 10,
        status: 'OPEN',
        order: null
      },
      {
        userId: 1,
        productId: 3,
        quantity: 10,
        status: 'OPEN',
        order: null
      },
      {
        userId: 1,
        productId: 4,
        quantity: 10,
        status: 'OPEN',
        order: null
      },
      {
        userId: 1,
        productId: 5,
        quantity: 5000,
        status: 'OPEN',
        order: null
      },
      {
        userId: 1,
        productId: 5,
        quantity: 45,
        status: 'CLOSED',
        order: 'F9OL50V'
      },
      {
        userId: 1,
        productId: 2,
        quantity: 67,
        status: 'CLOSED',
        order: 'F9OL50V'
      },
      {
        userId: 1,
        productId: 3,
        quantity: 8,
        status: 'CLOSED',
        order: 'F9OL50V'
      },
      {
        userId: 1,
        productId: 4,
        quantity: 1,
        status: 'CLOSED',
        order: 'F9OL50V'
      }
    ])
  ])

  console.log(`seeded ${users[0].length} users`)
  console.log(`seeded ${products[0].length} products`)
  console.log(`seeded ${carts[0].length} carts`)
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
    console.log('db connection CLOSED')
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
