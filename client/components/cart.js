import React, {Component} from 'react'
import {connect} from 'react-redux'
import {add, remove, clear, cart} from '../store/cart'
import {ProductsList} from './index'

/*
list of items - clicking image or tile links to item
increase/decrease quantity of each item
remove item from cart (x button or decreasing quantity to zero)
*/

class Cart extends Component {
  componentDidMount() {
    // this.props.showCart()
  }

  render() {
    // let cartItems = this.props.cart
    return (
      <div>
        <ul>
          {this.props.cart ? (
            <CartList cart={this.props.cart} />
          ) : (
            'Your cart is empty'
          )}
        </ul>
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
    cart: state.carts.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  //userId is optional - only pass for logged-in users
  return {
    addProduct: (productId, userId) => dispatch(add(productId, userId)),
    removeProduct: (productId, userId) => dispatch(remove(productId, userId)),
    clearCart: userId => dispatch(clearCartThunk(userId)),
    showCart: userId => dispatch(showCartThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
