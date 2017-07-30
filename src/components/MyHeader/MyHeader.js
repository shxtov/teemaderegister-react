import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { logout } from 'actions/LoginActions'
import { Input } from 'antd'
const Search = Input.Search

import './MyHeader.scss'

class MyHeader extends Component {
  handleClick(e) {
    console.log('click ', e)
  }

  handleSearch(value) {
    console.log(value)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    //const { pathname } = this.props.location

    return (
      <div className="header-wrapper">
        <div className="search">
          <Search
            size="large"
            placeholder="Search Te"
            onSearch={this.handleSearch.bind(this)}
          />
        </div>
        {/* <div style={{ float: 'right' }}>
          <Dropdown overlay={adminPanle} ghost>
            <a className="ant-dropdown-link">
              admin <Icon type="down" />
            </a>
          </Dropdown>
        </div> */}
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

MyHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
  //location: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(MyHeader)
