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
            <div className="product-price">
              ${(product.price / 100).toFixed(2)}
            </div>
          </Link>
          <div>{product.cart.quantity}</div>
          <button
            disabled={product.cart.quantity === 10000}
            onClick={() => props.incrementQty(product.id, props.user.id, true)}
            type="button"
          >
            +
          </button>
          <button
            disabled={product.cart.quantity === 1}
            onClick={() => props.decrementQty(product.id, props.user.id, true)}
            type="button"
          >
            -
          </button>
          <button
            onClick={() => props.removeProduct(product.id, props.user.id, true)}
            type="button"
          >
            TRASH
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartList
