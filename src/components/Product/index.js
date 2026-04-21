import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const Product = props => {
  const {details} = props
  const {id, name, weight} = details

  const priceString = details.price || details.cost || '0'
  const numericPrice = Number(String(priceString).replace(/[^0-9.]/g, '')) || 0

  const image = details.image || details.imageUrl || details.thumbnail || ''

  return (
    <CartContext.Consumer>
      {value => {
        const {
          cartList,
          addCartItem,
          incrementCartItem,
          decrementCartItem,
        } = value
        const cartItem = cartList.find(item => item.id === id)
        const quantity = cartItem ? cartItem.count : 0

        const onAddItem = () => {
          addCartItem({
            ...details,
            price: numericPrice,
            image,
            count: 1,
          })
        }

        return (
          <li className="product-card" data-testid="product">
            <img src={image} alt={name} className="product-image" />

            <p className="product-name">{name}</p>

            <div className="product-info">
              <div className="product-text">
                <p className="product-weight">{weight}</p>
                <p className="product-price">₹ {numericPrice}</p>
              </div>

              {quantity === 0 ? (
                <button
                  type="button"
                  className="add-btn"
                  data-testid="add-button"
                  onClick={onAddItem}
                  aria-label={`Add ${name}`}
                >
                  Add
                </button>
              ) : (
                <div className="quantity-container">
                  <button
                    type="button"
                    className="qty-btn"
                    data-testid="decrement-count"
                    onClick={() => decrementCartItem(id)}
                    aria-label={`Decrease ${name}`}
                  >
                    <AiOutlineMinus className="icon-size" />
                  </button>

                  <p className="quantity" data-testid="active-count">
                    {quantity}
                  </p>

                  <button
                    type="button"
                    className="qty-btn"
                    data-testid="increment-count"
                    onClick={() => incrementCartItem(id)}
                    aria-label={`Increase ${name}`}
                  >
                    <AiOutlinePlus className="icon-size" />
                  </button>
                </div>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Product
