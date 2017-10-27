import React from 'react'
import { PropTypes } from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'

import './Breadcrumbs.scss'

const Breadcrumbs = props => {
  const { crumbs } = props

  const extraBreadcrumbItems = crumbs.map(crumb => {
    const { url, name } = crumb

    const link = url
      ? <Link to={url}>
        {name}
      </Link>
      : name

    return (
      <Breadcrumb.Item key={url}>
        {link}
      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to='/'>
        <Icon type='home' />
      </Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems)

  return (
    <div id='breadcrumb-wrapper'>
      <Breadcrumb>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  )
}

Breadcrumbs.propTypes = {
  crumbs: PropTypes.array
}

export default Breadcrumbs
