import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
})

export default CartContext
