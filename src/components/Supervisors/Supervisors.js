import React from 'react'
import { PropTypes } from 'prop-types'

import { Table } from 'antd'
const { Column } = Table

const Supervisors = props => {
  const { supervisors } = props
  const { data, count, loading, query } = supervisors
  const { tab, sub } = query
  const pagination = {
    pageSize: 10,
    total: count[sub] || data.count,
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
          tab === 'supervisors' ? pagination : false
        }
        rowKey={r => r._id}
        dataSource={data}
      >
        <Column
          title="Supervisor"
          dataIndex="profile"
          key="supervisors"
          render={renderSupervisor}
          sorters={sorterSupervisor}
        />
      </Table>
    </div>
  )
}

const renderSupervisor = profile => profile.firstName + ' ' + profile.lastName

const sorterSupervisor = (a, b) => {
  let textA = a.profile.firstName.toUpperCase()
  let textB = b.profile.lastName.toUpperCase()
  return textA < textB ? -1 : textA > textB ? 1 : 0
}

Supervisors.propTypes = {
  supervisors: PropTypes.object.isRequired
}

export default Supervisors
