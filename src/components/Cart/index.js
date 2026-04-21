import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {MdDelete} from 'react-icons/md'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

class Cart extends Component {
  state = {
    isCheckout: false,
  }

  onCheckout = () => {
    this.setState({isCheckout: true})
  }

  onContinueShopping = () => {
    const {history} = this.props
    history.push('/')
  }

  renderEmptyCart = () => (
    <div className="empty-cart">
      <img
        src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269990/nxtMart/ybmj9lvlw4hayzbwyy6x.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="empty-heading">Your cart is empty</h1>
      <button
        type="button"
        className="shop-btn"
        onClick={this.onContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderSuccess = () => (
    <div className="checkout-success">
      <h1>Payment Successful</h1>
      <p>Thank you for ordering.</p>
      <p>Your payment is Successfully completed.</p>
      <button
        type="button"
        className="shop-btn"
        onClick={this.onContinueShopping}
      >
        Return to Homepage
      </button>
    </div>
  )

  renderCart = value => {
    const {cartList, clearCart} = value
    const {isCheckout} = this.state

    const total = cartList.reduce((acc, item) => {
      const price = Number(String(item.price).replace(/[^0-9.]/g, '')) || 0
      return acc + price * item.count
    }, 0)

    if (cartList.length === 0) {
      return this.renderEmptyCart()
    }

    if (isCheckout) {
      return this.renderSuccess()
    }

    return (
      <div className="cart-content">
        <div className="cart-header">
          <h1>Cart Items</h1>

          <button type="button" className="clear-btn" onClick={clearCart}>
            <MdDelete size={20} />
            Clear
          </button>
        </div>

        <ul className="cart-list">
          {cartList.map(item => (
            <CartItem key={item.id} product={item} />
          ))}
        </ul>

        {/* ✅ IMPROVED SUMMARY */}
        <div className="cart-summary">
          <p className="total-text" data-testid="total-price">
            Total ({cartList.length} items) : ₹ {total.toFixed(2)}
          </p>

          <button
            type="button"
            className="checkout-btn"
            onClick={this.onCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => (
          <div className="cart-container">
            <Header />
            <div className="cart-body">{this.renderCart(value)}</div>
            <Footer />
          </div>
        )}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Cart)
