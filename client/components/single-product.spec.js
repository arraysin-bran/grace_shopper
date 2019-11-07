/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './single-product'
import {product} from '../store/product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  const exampleProduct = {
    imageUrl:
      'https://gamepedia.cursecdn.com/zelda_gamepedia_en/7/7c/SS_Scattershot_Icon.png?version=f9d99f35a20e4c0d986308bc2ccd4b9f',
    name: 'slingshot',
    price: 75,
    description: 'used to shoot small projectiles',
    category: 'weapon'
  }

  describe('<SingleProduct /> component', () => {
    xit('rendered product should have an image, price, name, and description', () => {
      // const wrapper = shallow(<SingleProduct fetchProduct={() => ()} product={exampleProduct} match={{params: "/api/products/1"}} />).dive()
      // expect(wrapper.find('div.product-image').find('img').prop('src')).to.equal('https://gamepedia.cursecdn.com/zelda_gamepedia_en/7/7c/SS_Scattershot_Icon.png?version=f9d99f35a20e4c0d986308bc2ccd4b9f')
      // expect(wrapper.find('div.product-price').text()).to.equal('75')
      // expect(wrapper.find('div.product-name').text()).to.equal('slingshot')
      // expect(wrapper.find('div.product-desc').text()).to.equal('used to shoot small projectiles')
    })
  })
})
