import { connect } from 'react-redux'
import HeaderWrap from './HeaderWrap'
import { logout } from './HeaderWrapActions.js'

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(HeaderWrap)
