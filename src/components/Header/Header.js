import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { logout } from 'actions/LoginActions'

import './header.scss'
import img from 'media/logo.svg'

class Header extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth

    return (
      <header>
        <p>Header</p>
        <img className="header-logo" src={img} />
        {isAuthenticated &&
          <div>
            <p>
              Welcome {user.email}{' '}
              <button onClick={this.props.logout}>logout</button>
            </p>
          </div>}
        <br />

        <Link to="/">
          <button>Home</button>
        </Link>
        {!isAuthenticated &&
          <Link to="/login">
            <button>Login</button>
          </Link>}
      </header>
    )
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
