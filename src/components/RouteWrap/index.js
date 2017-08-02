import { connect } from 'react-redux'
import RouteWrap from './RouteWrap'
import { checkUser } from './RouteWrapActions'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  checkUser: auth => dispatch(checkUser(auth.isAuthenticated))
})
export default (ComposedComponent, restrict) => {
  return connect(mapStateToProps, mapDispatchToProps)(
    RouteWrap(ComposedComponent, restrict)
  )
}
