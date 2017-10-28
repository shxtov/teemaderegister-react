import React from 'react'
import { PropTypes } from 'prop-types'

import TableContentTopics from './TableContentTopics'
import TableContentSupervisors from './TableContentSupervisors'
import { Table } from 'antd'

const propTypes = {
  tableKey: PropTypes.string.isRequired,
  tableContent: PropTypes.object.isRequired,

  curriculum: PropTypes.object,
  supervisor: PropTypes.object,

  handleTableChange: PropTypes.func.isRequired
}

class TableContent extends React.Component {
  constructor (props) {
    super(props)

    this.columnsMap = {
      topics: TableContentTopics,
      supervisors: TableContentSupervisors
    }
  }

  render () {
    const {
      tableKey,
      curriculum,
      supervisor,

      handleTableChange
    } = this.props

    let { loading } = this.props.tableContent
    let { data, count, query } = this.props.tableContent[tableKey]
    const { sub, page, columnKey, order, types, curriculums } = query

    // TODO check if curriculum has SE or KU
    const { meta: { names, type } } = curriculum || { meta: {} }

    const currentPage = page ? parseInt(page) : 1

    const pagination = {
      pageSize: 20,
      total: count[sub] || 0,
      current: currentPage,
      size: ''
    }

    const Columns = this.columnsMap[tableKey]

    return (
      <div>
        <br />
        <Table
          size='small'
          loading={{ spinning: loading, delay: 200 }}
          onChange={handleTableChange}
          dataSource={data}
          pagination={pagination}
          expandedRowRender={
            tableKey === 'topics' && sub === 'available'
              ? renderExpandedRow
              : false
          }
          rowKey={r => r._id}
          bordered
          columns={Columns({
            // for creating columns
            sub,
            names,
            supervisor,
            type,

            // sort
            columnKey,
            order,

            // filters
            types,
            curriculums
          })}
        />
      </div>
    )
  }
}

const renderExpandedRow = record => {
  return (
    <span>
      {record.description || '-'}
    </span>
  )
}

TableContent.propTypes = propTypes

export default TableContent
