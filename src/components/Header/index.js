import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {CiHome, CiShoppingCart} from 'react-icons/ci'
import {BiLogOut} from 'react-icons/bi'

import './index.css'

class Header extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {location} = this.props
    const {pathname} = location

    const isHomeActive = pathname === '/'
    const isCartActive = pathname === '/cart'

    return (
      <>
        {/* DESKTOP */}
        <header className="header-lg">
          <div className="header-container">
            <Link to="/" className="logo-link">
              <img
                src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269995/nxtMart/fkvjpdhfywcpdzngq2le.png"
                alt="website logo"
                className="logo"
              />
            </Link>

            <ul className="nav-list">
              <li>
                <Link to="/" className="nav-link">
                  <button
                    type="button"
                    className={`nav-btn ${isHomeActive ? 'active-tab' : ''}`}
                  >
                    Home
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/cart" className="nav-link">
                  <button
                    type="button"
                    className={`nav-btn ${isCartActive ? 'active-tab' : ''}`}
                  >
                    Cart
                  </button>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </header>

        <nav className="mobile-nav">
          <Link to="/" className="mobile-link">
            <button
              type="button"
              aria-label="Home"
              className={`mobile-btn ${isHomeActive ? 'active-icon' : ''}`}
            >
              <CiHome size="25" />
            </button>
          </Link>

          <Link to="/cart" className="mobile-link">
            <button
              type="button"
              aria-label="Cart"
              className={`mobile-btn ${isCartActive ? 'active-icon' : ''}`}
            >
              <CiShoppingCart size="25" />
            </button>
          </Link>

          <button
            type="button"
            aria-label="Logout"
            className="mobile-btn"
            onClick={this.onLogout}
          >
            <BiLogOut size="25" />
          </button>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
