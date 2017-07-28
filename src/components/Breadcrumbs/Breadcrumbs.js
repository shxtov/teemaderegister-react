import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'

import './Breadcrumbs.scss'

class Breadcrumbs extends Component {
  render() {
    const { pathname } = this.props.location

    const breadcrumbNameMap = {
      '/login': 'Sign in'
    }
    const pathSnippets = pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      )
    })
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">
          <Icon type="home" />
        </Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)

    return (
      <div>
        {pathname !== '/' &&
          <div id="breadcrumb-wrapper">
            <Breadcrumb>
              {breadcrumbItems}
            </Breadcrumb>
          </div>}
      </div>
    )
  }
}

Breadcrumbs.propTypes = {
  location: PropTypes.object.isRequired
}

export default Breadcrumbs
