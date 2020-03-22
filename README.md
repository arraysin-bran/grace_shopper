# Fang and Bone

Simulate purchasing items from the Legend of Zelda: Breath of the Wild's favorite monstrous shop, Fang and Bone.

## Build Status

Visit the deployed app at [http://fang-and-bone.herokuapp.com/](http://fang-and-bone.herokuapp.com/)
Test User - Email: cody@email.com, Password: 123

[![Build Status](https://travis-ci.org/arraysin-bran/grace_shopper.svg?branch=master)](https://travis-ci.org/arraysin-bran/grace_shopper) [![Coverage Status](https://coveralls.io/repos/github/arraysin-bran/grace_shopper/badge.svg?branch=master)](https://coveralls.io/github/arraysin-bran/grace_shopper?branch=master)

## Technologies Used

Built with: React, Redux, Node, Postgres, Heroku, Travis

## Features

1.  View a listing of products and select individual products to view their details and add to your cart.
2.  Review your cart to increase or decrease the quantity of a product, delete an individual product, or clear the entire cart before checkout.
3.  Place and confirm an order through checkout.

## Setup

1.  Clone the repo to your local machine.
2.  Run `npm install` to install the packages.
3.  Create two postgres databases (`MY_APP_NAME` should match the name parameter in package.json):

```
export MY_APP_NAME=fang_and_bone
createdb $MY_APP_NAME
createdb $MY_APP_NAME-test
```

> By default, running `npm test` will use `fang_and_bone-test`, while regular development uses `fang_and_bone`

4.  Run `npm run seed` to populate your database with dummy data from the seed script file.
5.  Run `npm run start-dev` to bundle and run the app on the localhost (defaulted to `localhost:8080`).

## Credits

Boilerplate Code: [Fullstack Academy](https://github.com/FullstackAcademy)
The Legend of Zelda Copyright Nintendo
