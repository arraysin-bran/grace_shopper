import React, {Component} from 'react'
import {connect} from 'react-redux'
import {add, remove, clear, cart} from '../store/cart'

/*
list of items - clicking image or tile links to item
increase/decrease quantity of each item
remove item from cart (x button or decreasing quantity to zero)
*/

class Cart extends Component {
  componentDidMount() {
    this.props.showCart()
  }

  render() {
    let cartItems = this.props.cart

    console.log('cartItems: ', cartItems)
    return (
      <div>
        <ul>
          {cartItems
            ? cartItems.map(item => {
                return <li key={item.id}>{item.name}</li>
              })
            : 'Your cart is empty'}
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
