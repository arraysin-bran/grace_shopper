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
    console.log('Props in mount: ', this.props)
    // this.props.showCart(this.props.user.id, this.props.user.loggedIn)
    if (userId) {
      this.props.showCart(userId, true)
    }
  }

  render() {
    console.log('Cart state: ', this.props.cart)
    console.log('Current props: ', this.props)
    let cartUser = this.props.user
    console.log('User currently logged in: ', cartUser)
    let cartProducts = this.props.cart.products
    console.log("User's cart items: ", cartProducts)

    return (
      <div>
        <ul>
          {cartProducts ? (
            <CartList
              cartProducts={cartProducts}
              incrementQty={this.props.incrementQty}
              decrementQty={this.props.decrementQty}
              userInputQty={this.props.incrementQty}
              removeProduct={this.props.removeProduct}
            />
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
