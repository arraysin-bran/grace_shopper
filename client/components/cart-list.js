import React from 'react'
import {Link} from 'react-router-dom'

const CartList = props => {
  const cartProducts = props.cartProducts
  return (
    <div className="products-list-container">
      {cartProducts.map(product => (
        <div className="product-list-info" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="product-image-container">
              <img className="product-image" src={product.imageUrl} />
            </div>
            <div className="product-specs-container">
              <div className="product-name">{product.name}</div>
              <div className="product-price">
                ${(product.price * product.cart.quantity / 100).toFixed(2)}
              </div>
            </div>
          </Link>
          <div className="cart-product-options">
            <div className="cart-product-qty">Qty: {product.cart.quantity}</div>
            <div className="cart-product-iterators">
              <button
                className="inc-btn"
                disabled={product.cart.quantity === 10000}
                onClick={() =>
                  props.incrementQty(product.id, props.user.id, true)
                }
                type="button"
              >
                +
              </button>
              <button
                className="dec-btn"
                disabled={product.cart.quantity === 1}
                onClick={() =>
                  props.decrementQty(product.id, props.user.id, true)
                }
                type="button"
              >
                -
              </button>
            </div>
            <button
              className="trash-btn"
              onClick={() =>
                props.removeProduct(product.id, props.user.id, true)
              }
              type="button"
            >
              TRASH
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartList
