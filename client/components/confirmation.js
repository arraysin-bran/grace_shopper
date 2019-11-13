import React from 'react'

const Confirmation = props => {
  const {firstName, lastName, streetAddress, state, city, zip, close} = props

  return (
    <div className="confirmation-container">
      <p>Name: {`${firstName} ${lastName}`}</p>
      <p>
        Address: {`${streetAddress}`}
        <br /> {`${city}, ${state}, ${zip}`}
      </p>
      <button type="button" onClick={close}>
        Close
      </button>
    </div>
  )
}

export default Confirmation
