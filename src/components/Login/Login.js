import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'
import { Row, Col, Form, Icon, Input, Button, message, Tooltip } from 'antd'
const FormItem = Form.Item

import './login.scss'

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
      if (nextProps.hasLoginError) {
        console.log(nextProps.loginError)
        message.error(nextProps.loginError.msg)
        //nextProps.loginError.map(err => message.error(err.msg))
      }
    }
  }

  componentDidMount() {
    let emailInput = this.props.form.getFieldInstance('email').refs.input
    emailInput.focus()
  }

  componentWillUnmount() {
    this.props.initLogin()
  }

  submit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        // show user loading
        window.setTimeout(() => {
          this.props.login(values)
        }, 1000)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state

    const params = queryString.parse(this.props.location.search)
    const redirect = params.redirect || '/'
    const { isAuthenticated } = this.props.auth

    const crumbs = [{ url: this.props.location.pathname, name: 'Sign In' }]

    // TODO no redirect after logout?
    if (isAuthenticated) {
      return <Redirect to={redirect} />
    }

    return (
      <div id="login-page">
        <Breadcrumbs crumbs={crumbs} />
        <Row gutter={8}>
          <Col span={8} />
          <Col xs={24} sm={8}>
            <Form onSubmit={this.submit} className="login-form">
              <h2 className="center">
                Sign in to <span className="emphisize-title">Te</span>
              </h2>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter correct email' }
                  ]
                })(<Input prefix={<Icon type="user" />} placeholder="Email" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" />}
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
                <p>
                  <Tooltip
                    placement="topLeft"
                    title="If you do not have account please contact your school administrator"
                  >
                    <span>do not have account?</span>
                  </Tooltip>
                </p>
              </FormItem>
            </Form>
          </Col>
          <Col span={8} />
        </Row>
      </div>
    )
  }
}

Login.propTypes = {
  initLogin: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  loginError: PropTypes.object.isRequired,
  hasLoginError: PropTypes.bool.isRequired
}

export default Form.create()(Login)
