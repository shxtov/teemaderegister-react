import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import moment from 'moment'

import { Table, Badge, Tooltip, Icon } from 'antd'
const { Column } = Table

import './Topics.scss'

class Topics extends React.Component {
  constructor(props) {
    super(props)

    //this state
  }

  render() {
    const { topics, curriculum, handleTableChange } = this.props
    let { data, count, loading, query } = topics
    const { tab, sub, page, columnKey, order, types, curriculums } = query
    const { name, type } = curriculum.data // TODO check if curriculum has SE or KU
    const currentPage = page ? parseInt(page) : 1

    const pagination = {
      pageSize: 20,
      total: count[sub] || 0,
      current: currentPage,
      size: ''
    }

    return (
      <div>
        <br />
        <Table
          size="small"
          loading={{ spinning: loading, delay: 200 }}
          onChange={handleTableChange}
          pagination={
            // fix for pagination shift when changing tabs
            tab === 'topics' ? pagination : false
          }
          rowKey={r => r._id}
          dataSource={data}
          rowClassName={record => (record.description ? '' : 'no-desc')}
          expandedRowRender={sub === 'available' ? renderExpandedRow : false}
          bordered
        >
          <Column
            title="Title"
            dataIndex="title"
            key="title"
            render={renderTitle}
            sorter={true}
            sortOrder={columnKey === 'title' && order}
          />

          {sub === 'available' &&
            <Column
              className="align-col-center"
              filters={[
                { text: 'Sobib teistele õppekavadele', value: 'others' }
              ]}
              filterMultiple={false}
              title={
                <Tooltip placement="top" title={'Sobib teistele õppekavadele'}>
                  {'ÕK'}
                </Tooltip>
              }
              dataIndex="curriculums"
              key="curriculums"
              filteredValue={curriculums || null}
              render={renderCurriculums}
            />}

          {name === 'Informaatika' &&
            type === 'BA' &&
            <Column
              className="align-col-center"
              filterMultiple={false}
              // TODO other text value for other tabs
              filters={[
                {
                  text:
                    sub === 'available' ? 'Sobib seminaritööks' : 'Seminaritöö',
                  value: 'SE'
                }
              ]}
              sorter={true}
              sortOrder={columnKey === 'types' && order}
              title={
                <Tooltip
                  placement="top"
                  title={
                    sub === 'available' ? 'Sobib seminaritööks' : 'Seminaritöö'
                  }
                >
                  {'SE'}
                </Tooltip>
              }
              dataIndex="types"
              key="types"
              filteredValue={types || null}
              render={renderType}
            />}
          {(sub === 'registered' || sub === 'defended') &&
            <Column
              title="Author"
              dataIndex="author"
              key="author"
              sortOrder={columnKey === 'author' && order}
              render={renderAuthor}
              sorter={true}
            />}

          <Column
            title="Supervisor(s)"
            dataIndex="supervisors"
            key="supervisors"
            render={renderSupervisors}
          />

          {sub === 'registered' &&
            <Column
              title="Registered"
              dataIndex="registered"
              key="registered"
              className="align-col-right"
              render={renderDate}
              sorter={true}
              sortOrder={columnKey === 'registered' && order}
            />}

          {sub === 'defended' &&
            <Column
              title="Defended"
              className="align-col-right"
              dataIndex="defended"
              key="defended"
              render={renderDate}
              sorter={true}
              sortOrder={columnKey === 'defended' && order}
            />}
          {sub === 'defended' &&
            <Column
              title=""
              className="align-col-right"
              dataIndex="file"
              key="file"
              render={renderFile}
              sortOrder={columnKey === 'file' && order}
            />}
          {sub === 'available' &&
            <Column
              title="Added"
              className="align-col-right"
              dataIndex="accepted"
              key="accepted"
              render={renderDate}
              sorter={true}
              sortOrder={columnKey === 'accepted' && order}
            />}
        </Table>
      </div>
    )
  }
}

const renderFile = file => {
  return (
    <span>
      <a style={{ display: 'inline' }} href={file} target="_blank">
        <Icon type="file-pdf" style={{ fontSize: '15px' }} />
      </a>
    </span>
  )
}

const renderTitle = title => {
  return (
    <span>
      {title}
    </span>
  )
}

const renderExpandedRow = record => {
  return (
    <span>
      {record.description || '-'}
    </span>
  )
}

const renderDate = date => {
  return moment(date).format('DD.MM.YY')
}

const renderAuthor = author => {
  if (!author) return '-'
  return author.firstName + ' ' + author.lastName
}

const renderType = types => {
  if (types.indexOf('SE') !== -1) {
    return <Badge status="default" />
  } else {
    return null
  }
}
const renderCurriculums = curriculums => {
  if (curriculums.length > 1) {
    return <Badge status="default" />
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
  curriculum: PropTypes.object.isRequired,
  handleTableChange: PropTypes.func.isRequired
}

export default Topics
