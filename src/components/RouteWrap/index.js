import { connect } from 'react-redux'
import RouteWrap from './RouteWrap'
import { checkUser } from './RouteWrapActions'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(checkUser())
})
export default (ComposedComponent, restrict = false) => {
  return connect(mapStateToProps, mapDispatchToProps)(
    RouteWrap(ComposedComponent, restrict)
  )
}
