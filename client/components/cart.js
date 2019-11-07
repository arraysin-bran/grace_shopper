import React, {Component} from 'react'
import {connect} from 'react-redux'
import {add, remove, clear, cart} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    return (
      <div>
        <ul>
          <li>list of items - clicking image or tile links to item</li>
          <li>increase/decrease quantity of each item</li>
          <li>
            remove item from cart (x button or decreasing quantity to zero)
          </li>
          <li>clear cart button</li>
          <li>checkout button</li>
        </ul>
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
    fetchCart: () => dispatch(cart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
