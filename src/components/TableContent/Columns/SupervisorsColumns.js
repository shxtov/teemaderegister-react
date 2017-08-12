import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

import { Table } from 'antd'
const { Column, ColumnGroup } = Table

import moment from 'moment'

const substract = moment()
  .subtract(8, 'months')
  .isBefore(moment().startOf('year'))
const year = substract
  ? moment().startOf('year').subtract(1, 'year')
  : moment().startOf('year')
const yearStart = year.subtract(4, 'months').format('YY')
const yearEnd = year.add(8, 'months').format('YY')

const supervisor = ({ columnKey, order }) =>
  <Column
    title="Supervisor"
    dataIndex="supervisor"
    key="supervisor"
    sortOrder={columnKey === 'supervisor' && order}
    render={renderSupervisor}
    sorter={true}
  />

const registered = ({ columnKey, order }) =>
  <Column
    title="Registered"
    dataIndex="registered"
    key="registered"
    sortOrder={columnKey === 'registered' && order}
    className="align-col-right"
    sorter={true}
  />

const available = ({ columnKey, order }) =>
  <Column
    title="Available"
    dataIndex="available"
    key="available"
    sortOrder={columnKey === 'available' && order}
    className="align-col-right"
    sorter={true}
  />

const defendedLastYear = ({ columnKey, order }) =>
  <Column
    title={'Year' + ' ' + yearStart + '/' + yearEnd}
    dataIndex="defendedLastYear"
    key="defendedLastYear"
    sortOrder={columnKey === 'defendedLastYear' && order}
    className="align-col-right"
    sorter={true}
  />

const defended = ({ columnKey, order }) =>
  <Column
    title="Total"
    dataIndex="defended"
    key="defended"
    sortOrder={columnKey === 'defended' && order}
    className="align-col-right"
    sorter={true}
  />

const renderSupervisor = (supervisor, item) => {
  // TODO replace with slug
  const url = '/supervisor/' + item.slug

  return (
    <Link key={item._id} to={url}>
      {supervisor}
    </Link>
  )
}

const getColumnNames = () => {
  let columns = [
    'supervisor',
    'registered',
    'available',
    {
      title: 'Defended',
      subColumns: ['defendedLastYear', 'defended']
    }
  ] // default

  return columns
}

const definedColumns = {
  supervisor,
  registered,
  available,
  defendedLastYear,
  defended
}

export default params => {
  const { sub, names, type } = params
  const columns = getColumnNames({ sub, names, type })
  return columns.map(c => {
    if (typeof c === 'object') {
      const { title, subColumns } = c
      return (
        <ColumnGroup key={title} title={title}>
          {subColumns.map(subC => definedColumns[subC](params))}
        </ColumnGroup>
      )
    }
    return definedColumns[c](params)
  })
}
