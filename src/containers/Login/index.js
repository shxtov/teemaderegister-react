import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'actions/LoginActions'
import Link from 'valuelink'
import FormInput from 'components/Form/FormInput'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.submit = this.submit.bind(this)
  }

  submit(e) {
    e.preventDefault()
    const creds = {
      email: this.state.email.trim(),
      password: this.state.password.trim()
    }
    this.props.login(creds)
  }

  render() {
    let params = queryString.parse(this.props.location.search)
    let redirect = params.redirect || '/'
    let { isAuthenticated } = this.props.auth

    //TODO no redirect after logout?
    if (isAuthenticated) {
      return <Redirect to={redirect} />
    }

    const emailRegexPattern = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    const isEmail = x => Boolean(x.match(emailRegexPattern))
    isEmail.error = 'Should be valid email'

    const emailLink = Link.state(this, 'email')
      .check(x => x, '*')
      .check(isEmail)

    const passwordLink = Link.state(this, 'password')
      .check(x => x, '*')
      .check(x => x.length > 5, 'Password length must be atlest 5 ')

    return (
      <form onSubmit={this.submit}>
        {this.props.loading && <div>Loading....</div>}
        <FormInput label="email" valueLink={emailLink} type="text" />
        <br />
        <FormInput
          label="password"
          valueLink={passwordLink}
          type="password"
        />{' '}
        <br />
        <button disabled={emailLink.error || passwordLink.error} type="submit">
          Login
        </button>
      </form>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.login.loading,
    from: state.from
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
