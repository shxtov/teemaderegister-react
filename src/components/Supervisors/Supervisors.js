import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import moment from 'moment'

import { Table } from 'antd'
const { Column, ColumnGroup } = Table

const Supervisors = props => {
  const { supervisors, handleTableChange } = props
  const { data, count, loading, query } = supervisors
  const { tab, sub, page, columnKey, order } = query
  const currentPage = page ? parseInt(page) : 1

  const pagination = {
    pageSize: 20,
    total: count[sub] || data.count,
    current: currentPage
  }

  const substract = moment()
    .subtract(8, 'months')
    .isBefore(moment().startOf('year'))
  const year = substract
    ? moment().startOf('year').subtract(1, 'year')
    : moment().startOf('year')
  const yearStart = year.subtract(4, 'months').format('YY')
  const yearEnd = year.add(8, 'months').format('YY')

  return (
    <div>
      <br />
      <Table
        size="small"
        onChange={handleTableChange}
        loading={{ spinning: loading, delay: 200 }}
        pagination={
          // fix for pagination shift when changing tabs
          tab === 'supervisors' ? pagination : false
        }
        rowKey={r => r._id}
        dataSource={data}
        bordered
      >
        <Column
          title="Supervisor"
          dataIndex="profile"
          key="supervisors"
          sortOrder={columnKey === 'supervisors' && order}
          render={renderSupervisor}
          sorter={true}
        />

        <Column
          title="Registered"
          dataIndex="counts.registered"
          key="registered"
          sortOrder={columnKey === 'registered' && order}
          className="align-col-right"
          sorter={true}
        />
        <Column
          title="Available"
          dataIndex="counts.available"
          key="available"
          sortOrder={columnKey === 'available' && order}
          className="align-col-right"
          sorter={true}
        />
        <ColumnGroup title="Defended">
          <Column
            title={'Year' + ' ' + yearStart + '/' + yearEnd}
            dataIndex="counts.defendedLastYear"
            key="defendedLastYear"
            sortOrder={columnKey === 'defendedLastYear' && order}
            className="align-col-right"
            sorter={true}
          />
          <Column
            title="Current Cur"
            dataIndex="counts.defended"
            key="defended"
            sortOrder={columnKey === 'defended' && order}
            className="align-col-right"
            sorter={true}
          />
          <Column
            title="Other Cur"
            dataIndex="counts.otherCurriculum"
            key="otherCurriculum"
            sortOrder={columnKey === 'otherCurriculum' && order}
            className="align-col-right"
            sorter={true}
          />
        </ColumnGroup>
        {/*<Column
          title="Current total"
          dataIndex="counts.all"
          className="align-col-right"
        />*/}
      </Table>
    </div>
  )
}

const renderSupervisor = profile => {
  const linkContent = profile.firstName + ' ' + profile.lastName

  // TODO replace with slug
  const url = '/supervisor/' + profile._id

  return (
    <Link key={profile._id} to={url}>
      {linkContent}
    </Link>
  )
}

Supervisors.propTypes = {
  supervisors: PropTypes.object.isRequired,
  handleTableChange: PropTypes.func.isRequired
}

export default Supervisors
