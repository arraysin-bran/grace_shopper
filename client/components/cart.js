import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  inputQtyThunk,
  incrementQtyThunk,
  decrementQtyThunk,
  removeFromCartThunk,
  clearCartThunk,
  showCartThunk
} from '../store/cart'
import {Link} from 'react-router-dom'
import {CartList} from './index'
import user from '../store/user'

/*
list of items - clicking image or tile links to item
increase/decrease quantity of each item
remove item from cart (x button or decreasing quantity to zero)
*/

class Cart extends Component {
  componentDidMount() {
    let userId = this.props.user.id

    if (userId) {
      this.props.showCart(userId, true)
    }
  }
  handleClick(evt) {
    evt.preventDefault()
  }
  render() {
    let cartUser = this.props.user
    let cartProducts = this.props.cart
    return (
      <div>
        <ul>
          {cartProducts ? (
            <CartList
              cartProducts={cartProducts}
              user={cartUser}
              incrementQty={this.props.incrementQty}
              decrementQty={this.props.decrementQty}
              removeProduct={this.props.removeProduct}
            />
          ) : (
            'Your cart is empty'
          )}
        </ul>
        <form>
          <button
            onClick={() => this.props.clearCart(cartUser.id, true)}
            type="button"
          >
            Clear Cart
          </button>
          <Link to="/checkout">
            <button type="submit">Checkout</button>
          </Link>
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
  return {
    userInputQty: (productId, userId, quantity, loggedIn) =>
      dispatch(inputQtyThunk(productId, userId, quantity, loggedIn)),
    incrementQty: (productId, userId, loggedIn) =>
      dispatch(incrementQtyThunk(productId, userId, loggedIn)),
    decrementQty: (productId, userId, loggedIn) =>
      dispatch(decrementQtyThunk(productId, userId, loggedIn)),
    removeProduct: (productId, userId, loggedIn) =>
      dispatch(removeFromCartThunk(productId, userId, loggedIn)),
    clearCart: (userId, loggedIn) => dispatch(clearCartThunk(userId, loggedIn)),
    showCart: (userId, loggedIn) => dispatch(showCartThunk(userId, loggedIn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
