import React from 'react'
import {Link} from 'react-router-dom'

const Confirmation = props => {
  const {firstName, lastName, streetAddress, state, city, zip} = props

  return (
    <div id="confirmation-container">
      <div id="confirmation-details">
        <h1>Thank you for your order!</h1>
        <h2>{`${firstName} ${lastName}`}</h2>
        <p>
          Your order will be shipped to:
          <br /> {`${streetAddress}`}
          <br /> {`${city}, ${state}, ${zip}`}
        </p>
      </div>
      <div id="confirmation-close">
        <Link to="/products">
          <button id="close-btn" type="button">
            X
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Confirmation
