import React from 'react'
import {Link} from 'react-router-dom'

const ProductsList = props => {
  const products = props.products
  return (
    <div className="products-list-container">
      {products.map(product => (
        <div className="product-list-info" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className="product-image-container">
              <img className="product-image" src={product.imageUrl} />
            </div>
            <div className="product-specs-container">
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-type">Category: {product.category}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductsList
