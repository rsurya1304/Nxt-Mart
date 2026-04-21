import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {product} = props
  const {id, name, price, weight, image, count} = product

  return (
    <CartContext.Consumer>
      {value => {
        const {incrementCartItem, decrementCartItem, removeCartItem} = value

        return (
          <li className="cart-item" data-testid="cartItem">
            <div className="cart-item-left">
              <img src={image} alt={name} className="cart-img" />

              <div className="cart-details">
                <p className="name">{name}</p>
                <p className="weight">{weight}</p>
                <p className="price">₹ {price}</p>
              </div>
            </div>

            <div className="cart-item-right">
              <div className="cart-controls">
                <button
                  type="button"
                  data-testid="decrement-quantity"
                  aria-label={`decrement ${name}`}
                  className="qty-btn"
                  onClick={() => decrementCartItem(id)}
                >
                  <AiOutlineMinus size={14} />
                </button>

                <p data-testid="item-quantity" className="count">
                  {count}
                </p>

                <button
                  type="button"
                  data-testid="increment-quantity"
                  aria-label={`increment ${name}`}
                  className="qty-btn"
                  onClick={() => incrementCartItem(id)}
                >
                  <AiOutlinePlus size={14} />
                </button>
              </div>

              <button
                type="button"
                className="delete-btn"
                aria-label={`delete ${name}`}
                onClick={() => removeCartItem(id)}
              >
                <MdDelete size={18} />
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
