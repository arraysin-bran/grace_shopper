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
    this.props.history.push('/cart')
  }

  render() {
    const currentProduct = this.props.product
    return (
      <div className="product">
        <div id="product-header">
          <div id="product-header-left">
            <img id="single-product-img" src={currentProduct.imageUrl} />
          </div>
          <div id="product-header-right">
            <div id="product-specs-col">
              <div id="product-price">${currentProduct.price}</div>
              <div>Category: {currentProduct.category}</div>
            </div>
            <div id="product-qty-row">
              {/* <div>***LOCAL STORAGE QTY***</div> */}
              {/* <div>Quantity</div> */}
            </div>
            <div id="product-change-qty-row">
              <button id="add-cart-btn" onClick={this.addHandler} type="button">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="product-info">
          <div className="product-name">{currentProduct.name}</div>
          <hr />
          <div className="product-desc">{currentProduct.description}</div>
        </div>
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
