import React from 'react'
import {Link} from 'react-router-dom'

const ProductsList = props => {
  const products = props.products
  return (
    <div id="products-list">
      {products.map(product => (
        <div className="products-list-info" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="product-image">
              <img src={product.imageUrl} />
            </div>
            <div className="product-name">{product.name}</div>

            <div className="product-price">{product.price}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductsList
