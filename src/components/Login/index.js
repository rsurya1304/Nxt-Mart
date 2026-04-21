import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import {RiRotateLockLine} from 'react-icons/ri'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    const passwordEl = document.getElementById('password')
    if (passwordEl.type === 'password') {
      passwordEl.type = 'text'
    } else {
      passwordEl.type = 'password'
    }
  }

  onSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  render() {
    const {username, password, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }

    const btnColor =
      username !== '' && password !== '' ? 'login-green' : 'login-ash'

    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.onSubmit}>
          <img
            src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269995/nxtMart/fkvjpdhfywcpdzngq2le.png"
            alt="login website logo"
            className="login-logo"
          />

          <label htmlFor="username" className="label">
            USERNAME
          </label>

          <div className="input-container">
            <CgProfile />
            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onUsername}
              className="input"
            />
          </div>

          <label htmlFor="password" className="label">
            PASSWORD
          </label>

          <div className="input-container">
            <RiRotateLockLine />
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onPassword}
              className="input"
            />
          </div>

          <div className="show-password-container">
            <input
              type="checkbox"
              id="checkbox"
              onClick={this.onShowPassword}
            />
            <label htmlFor="checkbox" className="label">
              Show Password
            </label>
          </div>

          <button
            type="submit"
            disabled={username === '' || password === ''}
            className={`login-btn ${btnColor}`}
          >
            Login
          </button>

          {errMsg !== '' && <p className="error-msg">{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
