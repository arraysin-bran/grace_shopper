import React, {Component} from 'react'
import {connect} from 'react-redux'
import {product} from '../store/product'
import {addToCartThunk} from '../store/cart'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.addHandler = this.addHandler.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }
  addHandler(evt) {
    evt.preventDefault()
    // this.props.addToCart(this.props.match.params.id, this.props.user.userId, this.props.user.loggedIn)
    this.props.addToCart(this.props.match.params.id, this.props.user.id, true)
  }

  render() {
    const currentProduct = this.props.product
    return (
      <div id="product">
        <div id="product-header">
          <div id="product-header-left">
            <div className="product-image">
              <img className="item-image" src={currentProduct.imageUrl} />
            </div>
          </div>
          <div id="product-header-right">
            <div id="product-price-row">
              <div>${currentProduct.price}</div>
              <div>Cost</div>
            </div>
            <div id="product-qty-row">
              <div>{/*TODO*/}</div>
            </div>
            <div id="product-change-qty-row">
              <button onClick={this.addHandler} type="button">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="product-name">{currentProduct.name}</div>
        <div className="product-desc">{currentProduct.description}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.currentProduct,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: id => dispatch(product(id)),
    addToCart: (productId, userId, loggedIn) =>
      dispatch(addToCartThunk(productId, userId, loggedIn))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
