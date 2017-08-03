import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import moment from 'moment'

import { Table, Badge, Tooltip, Icon } from 'antd'
const { Column } = Table

import './Topics.scss'

const Topics = props => {
  const { topics, curriculum } = props
  const { data, count, loading, query } = topics
  const { tab, sub } = query
  const { name, type } = curriculum.data // TODO check if curriculum has SE or KU

  // console.log(data[0])
  // console.log(props)

  const supervisors = {
    data: [{ profile: { firstName: 'Romil', lastName: 'Robtsenkov', _id: 1 } }]
  }

  const pagination = {
    pageSize: 20,
    total: count[sub] || data.count,
    page: 1
  }

  return (
    <div>
      <br />
      <Table
        size="small"
        loading={{ spinning: loading, delay: 200 }}
        pagination={
          // fix for pagination shift when changing tabs
          tab === 'topics' ? pagination : false
        }
        rowKey={r => r._id}
        dataSource={data}
        rowClassName={record => (record.description ? '' : 'no-desc')}
        expandedRowRender={sub === 'available' ? renderExpandedRow : false}
      >
        <Column title="Title" dataIndex="title" render={renderTitle} />

        {sub === 'available' &&
          <Column
            title={
              <Tooltip placement="top" title={'Sobilik teistele õppekavadele'}>
                {'ÕK'}
              </Tooltip>
            }
            dataIndex="curriculums"
            render={renderCurriculums}
          />}

        {name === 'Informaatika' &&
          type === 'BA' &&
          <Column
            title={
              <Tooltip
                placement="top"
                title={
                  sub === 'available' ? 'Sobilik seminaritööks' : 'Seminaritöö'
                }
              >
                {'SE'}
              </Tooltip>
            }
            dataIndex="types"
            key="types"
            render={renderType}
          />}
        {(sub === 'registered' || sub === 'defended') &&
          <Column title="Author" dataIndex="author" render={renderAuthor} />}

        <Column
          title="Supervisor(s)"
          dataIndex="supervisors"
          filters={supervisors.data.map(s => {
            return {
              text: s.profile.firstName + ' ' + s.profile.lastName,
              value: s.profile.firstName + ' ' + s.profile.lastName
            }
          })}
          render={renderSupervisors.bind(this)}
        />

        {sub === 'registered' &&
          <Column
            title="Registered"
            dataIndex="registered"
            render={renderDate}
          />}

        {sub === 'defended' &&
          <Column title="Defended" dataIndex="defended" render={renderDate} />}
        {sub === 'defended' &&
          <Column title="" dataIndex="file" render={renderFile} />}
        {sub === 'available' &&
          <Column title="Added" dataIndex="accepted" render={renderDate} />}
      </Table>
    </div>
  )
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

const renderTitle = (title, item) => {
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
  console.log(curriculums)
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
  curriculum: PropTypes.object.isRequired
}

export default Topics
