import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import { Table } from 'antd'
const { Column } = Table

const Topics = props => {
  const { activeTab, activeSub, topics } = props
  const { data, count, loading } = topics

  const supervisors = {
    data: [{ profile: { firstName: 'Romil', lastName: 'Robtsenkov', _id: 1 } }]
  }

  const pagination = {
    pageSize: 10,
    total: count[activeSub] || data.count,
    page: 1
  }

  return (
    <div>
      <br />
      <br />
      <Table
        size="middle"
        loading={{ spinning: loading, delay: 200 }}
        pagination={
          // fix for pagination shift when changing tabs
          activeTab === 'topics' ? pagination : false
        }
        rowKey={r => r._id}
        dataSource={data}
      >
        <Column title="Title" dataIndex="title" key="_id" />
        <Column title="SE" dataIndex="types" key="types" render={renderType} />
        <Column
          title="Supervisor(s)"
          dataIndex="supervisors"
          key="supervisors"
          filters={supervisors.data.map(s => {
            return {
              text: s.profile.firstName + ' ' + s.profile.lastName,
              value: s.profile.firstName + ' ' + s.profile.lastName
            }
          })}
          render={renderSupervisors.bind(this)}
        />
      </Table>
    </div>
  )
}

const renderType = types => {
  if (types.indexOf('SE') !== -1) {
    return 'SE'
  } else {
    return null
  }
}

const renderSupervisors = arr => {
  return arr.map((o, i) => {
    const { _id, profile } = o.supervisor
    const linkContent =
      i < arr.length - 1 && arr.length > 1
        ? profile.firstName + ' ' + profile.lastName + ', '
        : profile.firstName + ' ' + profile.lastName

    // TODO replace with slug
    const url = '/supervisor/' + _id

    return (
      <Link key={_id} to={url}>
        {linkContent}
      </Link>
    )
  })
}

Topics.propTypes = {
  topics: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  activeSub: PropTypes.string.isRequired
}

export default Topics
