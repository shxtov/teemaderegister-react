import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

import { Input } from 'antd'
const Search = Input.Search

import './HeaderWrap.scss'

class HeaderWrap extends Component {
  handleClick(e) {
    console.log('click ', e)
  }

  handleSearch(value) {
    console.log(value)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    return (
      <div className="header-wrapper">
        <div className="search">
          <Search
            size="large"
            placeholder="Search Te"
            onSearch={this.handleSearch.bind(this)}
          />
        </div>
        {!isAuthenticated &&
          <div className="header-login">
            <Link to="/login">Sign in</Link>
          </div>}
        {isAuthenticated &&
          <div>
            <p>
              Welcome {user.email}{' '}
              <button onClick={this.props.logout}>logout</button>
            </p>
          </div>}
      </div>
    )
  }
}

HeaderWrap.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default HeaderWrap
