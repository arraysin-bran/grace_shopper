import React from 'react'
import {Link} from 'react-router-dom'

const CartList = props => {
  const cartProducts = props.cartProducts
  return (
    <div id="products-list">
      {cartProducts.map(product => (
        <div className="products-list-info" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="product-image">
              <img src={product.imageUrl} />
            </div>
            <div className="product-name">{product.name}</div>
            <div className="product-price">${product.price}</div>
          </Link>
          <input type="text" />
          <button type="button">+</button>
          <button type="button">-</button>
          <button type="button">TRASH</button>
        </div>
      ))}
    </div>
  )
}

export default CartList
