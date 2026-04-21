import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import CartContext from './context/CartContext'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    const data = localStorage.getItem('cartData')
    if (data !== null) {
      this.setState({cartList: JSON.parse(data)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {cartList} = this.state
    if (prevState.cartList !== cartList) {
      localStorage.setItem('cartData', JSON.stringify(cartList))
    }
  }

  addCartItem = product => {
    this.setState(prev => {
      const exists = prev.cartList.find(item => item.id === product.id)

      if (exists) {
        return {
          cartList: prev.cartList.map(item =>
            item.id === product.id ? {...item, count: item.count + 1} : item,
          ),
        }
      }

      return {
        cartList: [...prev.cartList, {...product, count: 1}],
      }
    })
  }

  incrementCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(item =>
        item.id === id ? {...item, count: item.count + 1} : item,
      ),
    }))
  }

  decrementCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(item => (item.id === id ? {...item, count: item.count - 1} : item))
        .filter(item => item.count > 0),
    }))
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(item => item.id !== id),
    }))
  }

  clearCart = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItem: this.incrementCartItem,
          decrementCartItem: this.decrementCartItem,
          removeCartItem: this.removeCartItem,
          clearCart: this.clearCart,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
