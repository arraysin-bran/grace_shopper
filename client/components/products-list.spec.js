/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductsList from './products-list'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductsList', () => {
  const products = [
    {
      imageUrl:
        'https://gamepedia.cursecdn.com/zelda_gamepedia_en/0/0b/TP_Bottle_Render.png?version=b20cbaab996bca1f6755fcb8de29baa4',
      name: 'empty jar',
      price: 5,
      description: 'an empty glass jar',
      category: 'item'
    },
    {
      imageUrl:
        'https://gamepedia.cursecdn.com/zelda_gamepedia_en/7/7c/SS_Scattershot_Icon.png?version=f9d99f35a20e4c0d986308bc2ccd4b9f',
      name: 'slingshot',
      price: 75,
      description: 'used to shoot small projectiles',
      category: 'weapon'
    }
  ]

  describe('<ProductsList /> component', () => {
    it('renders link items for the products passed in as props', () => {
      const wrapper = shallow(<ProductsList products={products} />)
      const linkItems = wrapper.find('Link')
      expect(linkItems).to.have.length(2)
    })

    xit('rendered list item should have an image, name, and price', () => {
      const wrapper = shallow(<ProductsList products={products} />)
      const linkItems = wrapper.find('Link')
      expect(
        linkItems
          .at(1)
          .find('div.product-image')
          .find('img')
          .prop('src')
      ).to.equal(
        'https://gamepedia.cursecdn.com/zelda_gamepedia_en/7/7c/SS_Scattershot_Icon.png?version=f9d99f35a20e4c0d986308bc2ccd4b9f'
      )
      expect(
        linkItems
          .at(1)
          .find('div.product-name')
          .text()
      ).to.equal('slingshot')
      expect(
        linkItems
          .at(1)
          .find('div.product-price')
          .text()
      ).to.equal('$75')
    })
  })
})
