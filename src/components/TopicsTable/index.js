import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Table, Radio } from 'antd'
const { Column } = Table
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

class TopicsTable extends Component {
  constructor(props) {
    super(props)
    //console.log(props)
  }

  render() {
    console.log('R:TopicsTable')
    const { activeTab, activeSub, changeSub, topics, tableLoading } = this.props
    const supervisors = {
      data: [
        { profile: { firstName: 'Romil', lastName: 'Robtsenkov', _id: 1 } }
      ]
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
          loading={{ spinning: tableLoading, delay: 200 }}
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
          <Column
            title="SE"
            dataIndex="types"
            key="types"
            render={this.renderType}
          />
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
            render={this.renderSupervisors}
          />
        </Table>
      </div>
    )
  }

  renderType(types, record, index) {
    if (types.indexOf('SE') !== -1) {
      return 'SE'
    } else {
      return null
    }
  }

  renderSupervisors(arr, record, index) {
    return arr.map((o, i) => {
      let { _id, profile } = o.supervisor
      if (i < arr.length - 1 && arr.length > 1) {
        //TODO replace with slug
        return (
          <Link key={_id} to={'/supervisor/' + _id}>
            {profile.firstName + ' ' + profile.lastName}
            {', '}
          </Link>
        )
      } else {
        return (
          <Link key={_id} to={'/supervisor/' + _id}>
            {profile.firstName + ' ' + profile.lastName}
          </Link>
        )
      }
    })
  }
}

export default TopicsTable
