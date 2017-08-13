import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

import { Input, Layout } from 'antd'
const Search = Input.Search
const { Header } = Layout

import './HeaderWrap.scss'

class HeaderWrap extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  // Disable update on every simple change
  // shouldComponentUpdate(nextProps) {
  //   const authChanged = this.props.auth.user !== nextProps.auth.user
  //   return authChanged
  // }

  handleSearch(value) {
    console.log(value)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    return (
      <Header>
        <div id="header-wrapper">
          <Link to="/">
            <div className="header-logo">Te</div>
          </Link>
          <div className="header-content">
            <div className="search">
              <Search
                size="large"
                placeholder="Search Te"
                onSearch={this.handleSearch}
                defaultValue={'romil'}
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
        </div>
      </Header>
    )
  }
}

HeaderWrap.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default HeaderWrap
