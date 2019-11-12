import axios from 'axios'
import React, {Component} from 'react'
import Review from './review'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  streetAdress: '',
  city: '',
  state: '',
  zipCode: '',
  telephone: '',
  cardNumebr: '',
  expirationDate: '',
  cvv: '',
  showReview: false
}

class Checkout extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.getLastFour = this.getLastFour.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    evt.preventDefault()
    this.setState({[evt.target.name]: evt.target.value})
  }
  //update user
  handleSubmit(evt) {
    evt.proventDefault()
    this.setState(initialState)
  }

  handleReview(evt) {
    evt.preventDefault()
    const newReview = !this.state.showReview
    return this.setState({showReview: newReview})
  }

  getLastFour(cardNumber) {
    return cardNumber.slice(12)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">
              <small>email</small>
            </label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="streetAddress">
              <small>Street Address</small>
            </label>
            <input
              name="streetAddress"
              type="text"
              value={this.state.streetAddress}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="city">
              <small>City</small>
            </label>
            <input
              name="city"
              type="text"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="state">
              <small>State</small>
            </label>
            <input
              name="state"
              type="text"
              value={this.state.state}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">
              <small>Zip Code</small>
            </label>
            <input
              name="zipCode"
              type="text"
              value={this.state.zip}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="cardNumber">
              <small>Card Number</small>
            </label>
            <input
              name="cardNumber"
              type="text"
              value={this.state.cardNumber}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="expirationDate">
              <small>Expiration Date</small>
            </label>
            <input
              name="expirationDate"
              type="text"
              value={this.state.expirationDate}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="cvv">
              <small>CVV</small>
            </label>
            <input
              name="cvv"
              type="text"
              value={this.state.cvv}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" onClick={this.handleReview}>
            Review
          </button>
          {this.state.showReview ? (
            <Review
              cardNumber={this.getLastFour(this.state.cardNumber)}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              streetAddress={this.state.streetAddress}
              state={this.state.state}
              city={this.state.city}
              zip={this.state.zipCode}
            />
          ) : null}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Checkout
