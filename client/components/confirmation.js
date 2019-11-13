import React from 'react'
import {Link} from 'react-router-dom'

const Confirmation = props => {
  const {firstName, lastName, streetAddress, state, city, zip, close} = props

  return (
    <div className="confirmation-container">
      <h1>Thank you for your order!</h1>
      <h2>{`${firstName} ${lastName}`}</h2>
      <p>
        Your order will be shipped to:<br /> {`${streetAddress}`}
        <br /> {`${city}, ${state}, ${zip}`}
      </p>
      <button type="button" onClick={close}>
        Close
      </button>
      <Link to="/products">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  )
}

export default Confirmation
