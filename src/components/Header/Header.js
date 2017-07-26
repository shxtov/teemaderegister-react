import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
const SomeComponent = withRouter(props => <Header {...props} />)

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { logout } from 'actions/LoginActions'

import { Menu, Icon } from 'antd'

import './header.scss'
import img from 'media/logo.svg'

class Header extends Component {
  constructor(props) {
    super(props)
    let currentLocation = this.props.location.pathname
    this.state = {
      current: currentLocation
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    console.log('click ', e)
    this.setState({
      current: e.key
    })
  }

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

        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="home" />Home
            </Link>
          </Menu.Item>
          {!isAuthenticated &&
            <Menu.Item key="/login">
              <Link to="/login">
                <Icon type="login" />Login
              </Link>
            </Menu.Item>}
        </Menu>
      </header>
    )
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(SomeComponent)
