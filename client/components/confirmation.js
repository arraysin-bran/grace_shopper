import React from 'react'

const Confirmation = props => {
  const {firstName, lastName, streetAddress, state, city, zip} = props
  return (
    <div>
      <p>Name: {`${firstName} ${lastName}`}</p>
      <p>
        Address: {`${streetAddress}`}
        <br /> {`${city}, ${state}, ${zip}`}
      </p>
    </div>
  )
}

export default Confirmation
