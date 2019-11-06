import React, {Component} from 'react'
import {connect} from 'react-redux'
import {products} from '../store/product'
import {ProductsList} from './index'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    console.log('Products passed to All Products:', this.props.products)
    return (
      <div id="products">
        <div className="products-header">
          <div>All Items</div>
          <div>Price</div>
        </div>
        <ProductsList products={this.props.products} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => {
  return {fetchProducts: () => dispatch(products())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)