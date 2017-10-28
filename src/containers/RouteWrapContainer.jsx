import { connect } from 'react-redux'
import RouteWrap from '../components/RouteWrap'
import { checkUser } from '../actions/RouteWrapActions'

// const RouteWrapContainer = props => <RouteWrap {...props} />

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
