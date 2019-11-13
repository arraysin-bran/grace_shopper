import React from 'react'

const Review = props => {
  const {
    firstName,
    lastName,
    email,
    streetAddress,
    state,
    city,
    zip,
    cardNumber
  } = props
  return (
    <div>
      <p>Name: {`${firstName} ${lastName}`}</p>
      <p>Email: {`${email}`}</p>
      <p>
        Address: {`${streetAddress}`}
        <br /> {`${city}, ${state}, ${zip}`}
      </p>
      <p>Payment info: {`**** **** **** ${cardNumber}`}</p>
    </div>
  )
}

export default Review
