import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Table, Radio } from 'antd'
const { Column } = Table
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

class SupervisorsTable extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    console.log('R:SupervisorsTable')
    const { activeSub, changeSub, supervisors, tableLoading } = this.props

    return (
      <div>
        <RadioGroup value={activeSub} onChange={changeSub}>
          <RadioButton value="supervised">
            Supervised | {supervisors.count.supervised}
          </RadioButton>
          <RadioButton value="all">All</RadioButton>
        </RadioGroup>
        <br />
        <br />
        <Table
          size="middle"
          loading={{ spinning: tableLoading, delay: 200 }}
          pagination={{
            total: supervisors.count,
            page: 1
          }}
          rowKey={r => r._id}
          dataSource={supervisors.data}
        >
          <Column
            title="Supervisor"
            dataIndex="profile"
            key="supervisors"
            render={this.renderSupervisor}
            sorters={this.sorterSupervisor}
          />
        </Table>
      </div>
    )
  }

  renderSupervisor(profile, record, index) {
    return profile.firstName + ' ' + profile.lastName
  }
  sorterSupervisor(a, b) {
    let textA = a.profile.firstName.toUpperCase()
    let textB = b.profile.lastName.toUpperCase()
    return textA < textB ? -1 : textA > textB ? 1 : 0
  }
}

export default SupervisorsTable
