import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from 'actions/LoginActions'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import { Row, Col, Form, Icon, Input, Button, message } from 'antd'
const FormItem = Form.Item

import './login.less'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: props.loading
    }
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.loading !== this.state.loading) {
      this.setState({ loading: nextProps.loading })
      console.log(nextProps.loginErrors)
      if (nextProps.loginErrors.length > 0) {
        nextProps.loginErrors.map(err => message.error(err.msg))
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    //const { loginErrors } = this.props
    const { loading } = this.state

    let params = queryString.parse(this.props.location.search)
    let redirect = params.redirect || '/'
    let { isAuthenticated } = this.props.auth

    //TODO no redirect after logout?
    if (isAuthenticated) {
      return <Redirect to={redirect} />
    }

    return (
      <Row gutter={8}>
        <Col span={8} />
        <Col xs={24} sm={8}>
          {/* {loginErrors.length > 0 &&
            loginErrors.map((err, i) =>
              <Alert key={i} message={err.msg} type="error" closable="true" />
            )} */}
          <Form onSubmit={this.submit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                  { type: 'email', message: 'Please enter correct email' }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </Col>
        <Col span={8} />
      </Row>
    )
  }

  submit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.setState({ loading: true })
        window.setTimeout(() => {
          this.props.login(values)
        }, 1000)
      }
    })
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  loginErrors: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.login.loading,
    loginErrors: state.login.errors,
    from: state.from
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds))
  }
}

const WrappedLogin = Form.create({
  onValuesChange(_, values) {
    console.log(values)
  }
})(Login)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLogin)
