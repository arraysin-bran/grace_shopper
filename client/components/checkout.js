import React, {Component} from 'react'
import {update} from '../store/user'
import {connect} from 'react-redux'
import Review from './review'
import Confirmation from './confirmation'
import Modal from 'react-modal'

Modal.defaultStyles.content.top = 150
Modal.defaultStyles.content.left = 80
Modal.defaultStyles.content.right = 80
Modal.defaultStyles.content.bottom = 150
Modal.defaultStyles.content.backgroundColor = 'black'
Modal.defaultStyles.content.opacity = '0.7'

const initialState = {
  user: {},
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  showReview: false,
  showConfirmation: false
}

class Checkout extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.getLastFour = this.getLastFour.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTopLevelChange = this.handleTopLevelChange.bind(this)
  }
  componentDidMount() {
    this.setUserState()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setUserState()
    }
  }

  setUserState() {
    const {user: {googleId: _, ...restOfUser}} = this.props
    this.setState({
      user: restOfUser || {},
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    })
  }

  handleChange() {
    this.setState({
      user: {...this.state.user, [event.target.name]: event.target.value}
    })
  }

  handleTopLevelChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.update(this.state.user)
    this.setState({...this.state, showReview: false, showConfirmation: true})
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
    const {user} = this.state

    return (
      <div className="checkout-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">
              <small>{`First Name ${this.props.user.id}`}</small>
            </label>
            <input
              name="firstName"
              type="text"
              value={user.firstName}
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
              value={user.lastName}
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
              value={user.email}
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
              value={user.streetAddress}
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
              value={user.city}
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
              value={user.state}
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
              value={user.zipCode}
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
              onChange={this.handleTopLevelChange}
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
              onChange={this.handleTopLevelChange}
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
              onChange={this.handleTopLevelChange}
            />
          </div>
          <button type="submit" onClick={this.handleReview}>
            Review
          </button>
          {this.state.showReview && (
            <Review
              cardNumber={this.getLastFour(this.state.cardNumber)}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              streetAddress={user.streetAddress}
              state={user.state}
              city={user.city}
              zip={user.zipCode}
            />
          )}
          <button type="submit">Confirm</button>
          <Modal
            isOpen={this.state.showConfirmation}
            onRequestClose={() => this.setState({showConfirmation: false})}
          >
            <Confirmation
              firstName={user.firstName}
              lastName={user.lastName}
              streetAddress={user.streetAddress}
              state={user.state}
              city={user.city}
              zip={user.zipCode}
              close={() => this.setState({showConfirmation: false})}
            />
          </Modal>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: user => dispatch(update(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
