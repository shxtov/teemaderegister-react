import { connect } from 'react-redux'
import { initLogin, login } from './LoginActions'
import Login from './Login'

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.login.loading,
  loginError: state.login.error,
  hasLoginError: state.login.hasError,
  from: state.from
})

export default connect(mapStateToProps, { initLogin, login })(Login)
