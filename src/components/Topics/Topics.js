import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import { Table, Radio } from 'antd'
const { Column } = Table
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const Topics = props => {
  const { activeTab, activeSub, changeSub, topics, loading } = props
  const supervisors = {
    data: [{ profile: { firstName: 'Romil', lastName: 'Robtsenkov', _id: 1 } }]
  }

  return (
    <div>
      <RadioGroup value={activeSub} onChange={changeSub}>
        <RadioButton value="registered">
          Registered | {topics.count.registered}
        </RadioButton>
        <RadioButton value="available">
          Available | {topics.count.available}
        </RadioButton>
        <RadioButton value="defended">
          Defended | {topics.count.defended}
        </RadioButton>
        <RadioButton value="all">All</RadioButton>
      </RadioGroup>
      <br />
      <br />
      <Table
        size="middle"
        loading={{ spinning: loading, delay: 200 }}
        pageSize={5}
        pagination={
          // fix for pagination shift
          activeTab === 'topics'
            ? {
              total: topics.count,
              page: 1
            }
            : false
        }
        rowKey={r => r._id}
        dataSource={topics.data}
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
  activeTab: PropTypes.string.isRequired,
  activeSub: PropTypes.string.isRequired,
  changeSub: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.object.isRequired
}

export default Topics
