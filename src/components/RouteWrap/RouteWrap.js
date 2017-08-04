import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

export default (ComposedComponent, restrict) => {
  class RouteWrap extends React.Component {
    componentWillMount() {
      this.props.checkUser(this.props.auth)
      analytics(this.props.location.pathname)
    }

    render() {
      let { isAuthenticated, authInProgress } = this.props.auth
      let { pathname } = this.props.location

      if (restrict && !isAuthenticated && !authInProgress) {
        const redirect = {
          pathname: '/login',
          search: '?redirect=' + pathname
        }
        return <Redirect to={redirect} />
      } else if (!authInProgress) {
        return <ComposedComponent {...this.props} />
      } else {
        // loading...
        return null
      }
    }
  }

  RouteWrap.propTypes = {
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    checkUser: PropTypes.func.isRequired
  }

  RouteWrap.contextTypes = {
    router: PropTypes.object.isRequired
  }

  const analytics = route => {
    //console.log(route)
  }

  return RouteWrap
}
