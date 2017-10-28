import React from 'react'
import { connect } from 'react-redux'
import { initLogin, login } from '../actions/LoginActions'
import Login from '../components/Login'

const LoginContainer = props => <Login {...props} />

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.login.loading,
  loginError: state.login.error,
  hasLoginError: state.login.hasError,
  from: state.from
})

export default connect(mapStateToProps, { initLogin, login })(LoginContainer)
