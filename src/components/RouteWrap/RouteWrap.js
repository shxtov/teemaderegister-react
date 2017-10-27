import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

export default (ComposedComponent, restrict) => {
  class RouteWrap extends React.Component {
    constructor (props) {
      super(props)
      this.state = { allowPageLoad: false }
    }

    componentDidMount () {
      this.props.checkUser()
      analytics(this.props.location.pathname)
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.auth.authInProgress === true &&
        nextProps.auth.authInProgress === false) {
        // auth finished, allow to load page
        this.setState({ allowPageLoad: true })
      }
    }

    render () {
      const { allowPageLoad } = this.state

      const {
        auth: { isAuthenticated },
        location: { pathname }
      } = this.props

      if (restrict && !isAuthenticated && allowPageLoad) {
        const redirect = {
          pathname: '/login',
          search: '?redirect=' + pathname
        }

        return <Redirect to={redirect} />
      } else if (allowPageLoad) {
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
    console.log(route)
  }

  return RouteWrap
}
