import React, {Component} from 'react'
import {connect} from 'react-redux'
import {add, remove, clear, cart} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.showCart() //do we need this?
  }

  render() {
    let cartItems
    if (this.props.cart) {
      cartItems = this.props.cart
    } else {
      cartItems = []
    }
    console.log('cartItems: ', cartItems)
    return (
      <div>
        <ul>
          <li>list of items - clicking image or tile links to item</li>
          <li>increase/decrease quantity of each item</li>
          <li>
            remove item from cart (x button or decreasing quantity to zero)
          </li>
        </ul>
        {cartItems.map(item => {
          return (
            <div key={item.id}>
              <div>{item.name}</div>
            </div>
          )
        })}
        <form>
          <button type="button">Clear Cart</button>
          <button type="submit">Checkout</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.carts.cart
  }
}

const mapDispatchToProps = dispatch => {
  //userId is optional - only pass for logged-in users
  return {
    addProduct: (productId, userId) => dispatch(add(productId, userId)),
    removeProduct: (productId, userId) => dispatch(remove(productId, userId)),
    clearCart: userId => dispatch(clear(userId)),
    showCart: () => dispatch(cart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
