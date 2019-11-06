import React, {Component} from 'react'
import {connect} from 'react-redux'
import {product} from '../store/product'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.fetchProduct(productId)
  }

  render() {
    const currentProduct = this.props.product
    return (
      <div id="product">
        <div id="product-header">
          <div id="product-header-left">
            <div className="product-image">
              <img src={currentProduct.imageUrl} />
            </div>
          </div>
          <div id="product-header-right">
            <div id="product-price-row">
              <div>{currentProduct.price}</div>
              <div>Cost</div>
            </div>
            <div id="product-qty-row">
              <div>***LOCAL STORAGE QTY***</div>
              <div>Quantity</div>
            </div>
            <div id="product-change-qty-row">
              <button type="button">+</button>
              <button type="button">-</button>
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
    product: state.products.currentProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {fetchProduct: id => dispatch(product(id))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
