import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import { Table, Badge, Tooltip, Icon } from 'antd'
const { Column } = Table

import moment from 'moment'

const typesMap = {
  SE: 'Seminaritöö',
  BA: 'Bakalaureusetöö',
  MA: 'Magistritöö',
  PHD: 'Doktoritöö'
}

const title = ({ columnKey, order }) =>
  <Column
    title="Title"
    dataIndex="title"
    key="title"
    render={renderTitle}
    sorter={true}
    sortOrder={columnKey === 'title' && order}
  />
title.propTypes = {
  columnKey: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired
}

const curriculums = ({ curriculums }) =>
  <Column
    className="align-col-center"
    filters={[{ text: 'Sobib teistele õppekavadele', value: 'others' }]}
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
  />

const detailTypes = () =>
  <Column
    className="align-col-left"
    dataIndex="types"
    key="types"
    title="Types"
    render={renderDetailTypes}
  />

const detailCurriculums = () =>
  <Column
    className="align-col-left"
    dataIndex="curriculums"
    key="curriculums"
    title="Curriculum"
    render={renderDetailCurriculums}
  />
const types = ({ columnKey, order, sub, types }) =>
  <Column
    className="align-col-center"
    filterMultiple={false}
    // TODO other text value for other tabs
    filters={[
      {
        text: sub === 'available' ? 'Sobib seminaritööks' : 'Seminaritöö',
        value: 'SE'
      }
    ]}
    sorter={true}
    sortOrder={columnKey === 'types' && order}
    title={
      <Tooltip
        placement="top"
        title={sub === 'available' ? 'Sobib seminaritööks' : 'Seminaritöö'}
      >
        {'SE'}
      </Tooltip>
    }
    dataIndex="types"
    key="types"
    filteredValue={types || null}
    render={renderType}
  />
const author = ({ columnKey, order }) =>
  <Column
    title="Author"
    dataIndex="author"
    key="author"
    sortOrder={columnKey === 'author' && order}
    render={renderAuthor}
    sorter={true}
  />
const supervisors = () =>
  <Column
    title="Supervisor(s)"
    dataIndex="supervisors"
    key="supervisors"
    render={renderSupervisors}
  />
const registered = ({ columnKey, order }) =>
  <Column
    title="Registered"
    dataIndex="registered"
    key="registered"
    className="align-col-right"
    render={renderDate}
    sorter={true}
    sortOrder={columnKey === 'registered' && order}
  />
const defended = ({ columnKey, order }) =>
  <Column
    title="Defended"
    className="align-col-right"
    dataIndex="defended"
    key="defended"
    render={renderDate}
    sorter={true}
    sortOrder={columnKey === 'defended' && order}
  />
const file = ({ columnKey, order }) =>
  <Column
    title=""
    className="align-col-right"
    dataIndex="file"
    key="file"
    render={renderFile}
    sortOrder={columnKey === 'file' && order}
  />
const accepted = ({ columnKey, order }) =>
  <Column
    title="Added"
    className="align-col-right"
    dataIndex="accepted"
    key="accepted"
    render={renderDate}
    sorter={true}
    sortOrder={columnKey === 'accepted' && order}
  />

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
const renderDetailTypes = types => {
  if (types.length === 0) return null
  return types.map((t, i) => {
    const content = i < types.length - 1 && types.length > 1 ? t + ', ' : t

    return (
      <Tooltip key={t} placement="topLeft" title={typesMap[t]}>
        {content}
      </Tooltip>
    )
  })
}
const renderCurriculums = curriculums => {
  if (curriculums.length > 1) {
    return <Badge status="default" />
  } else {
    return null
  }
}

const renderDetailCurriculums = curriculums => {
  if (curriculums.length === 0) return null
  return curriculums.map((c, i) => {
    const url = '/curriculum/' + c.slugs.et
    const abbr = c.abbreviation
    const content =
      i < curriculums.length - 1 && curriculums.length > 1 ? abbr + ', ' : abbr

    return (
      <Tooltip
        key={c._id}
        placement="topLeft"
        title={c.names.et + ' ' + c.type}
      >
        <Link style={{ width: 'auto', paddingRight: 3 }} to={url}>
          {content}
        </Link>
      </Tooltip>
    )
  })
}

const renderSupervisors = arr => {
  return arr.map((o, i) => {
    const { _id, profile } = o.supervisor
    const linkContent =
      i < arr.length - 1 && arr.length > 1
        ? profile.firstName + ' ' + profile.lastName + ', '
        : profile.firstName + ' ' + profile.lastName

    // TODO replace with slug
    const url = '/supervisor/' + profile.slug

    return (
      <Link key={_id} to={url}>
        {linkContent}
      </Link>
    )
  })
}

const getColumnNames = ({ sub, names, type, supervisor }) => {
  let columns = ['title'] // default

  // TODO check for other types of works in curriculum SE or KT
  const isInformaticsBa = names && names.et === 'Informaatika' && type === 'BA'
  const isSupervisorPage = !!supervisor.data.profile

  if (sub === 'registered') {
    if (isSupervisorPage) columns.push('detailTypes')
    if (isSupervisorPage) columns.push('detailCurriculums')
    if (isInformaticsBa) columns.push('types')

    columns.push('author', 'supervisors', 'registered')
  }

  if (sub === 'available') {
    if (isSupervisorPage) columns.push('detailTypes')
    if (isSupervisorPage) columns.push('detailCurriculums')
    if (!isSupervisorPage) columns.push('curriculums')
    if (isInformaticsBa) columns.push('types')

    columns.push('supervisors', 'accepted')
  }

  if (sub === 'defended') {
    if (isSupervisorPage) columns.push('detailTypes')
    if (isSupervisorPage) columns.push('detailCurriculums')
    if (isInformaticsBa) columns.push('types')

    columns.push('author', 'supervisors', 'defended', 'file')
  }

  return columns
}

const definedColumns = {
  title,
  curriculums,
  detailCurriculums,
  detailTypes,
  accepted,
  registered,
  defended,
  types,
  supervisors,
  author,
  file
}

export default params => {
  const columns = getColumnNames(params)
  return columns.map(c => {
    return definedColumns[c](params)
  })
}
