import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { checkUser } from 'actions/AuthActions'

export default function(ComposedComponent, restrict) {
  class RouteCheck extends React.Component {
    componentWillMount() {
      analytics(this.props.location.pathname)

      this.props.checkUser(this.props.auth)
    }
    render() {
      let { isAuthenticated, authInProgress } = this.props.auth
      let { pathname } = this.props.location

      if (restrict && !isAuthenticated && !authInProgress) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              search: '?redirect=' + pathname
            }}
          />
        )
      } else if (!authInProgress) {
        return <ComposedComponent {...this.props} />
      } else {
        return <div>Loading...</div>
      }
    }
  }

  RouteCheck.propTypes = {
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    checkUser: PropTypes.func.isRequired
  }

  RouteCheck.contextTypes = {
    router: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      checkUser: auth => dispatch(checkUser(auth.isAuthenticated))
    }
  }

  function analytics(route) {
    console.log('ROUTE' + route)
  }

  return connect(mapStateToProps, mapDispatchToProps)(RouteCheck)
}
