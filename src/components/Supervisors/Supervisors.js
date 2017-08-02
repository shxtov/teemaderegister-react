import React from 'react'
import { PropTypes } from 'prop-types'

import { Table, Radio } from 'antd'
const { Column } = Table
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const Supervisors = props => {
  const { activeSub, changeSub, supervisors, loading } = props

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
        loading={{ spinning: loading, delay: 200 }}
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
  activeTab: PropTypes.string.isRequired,
  activeSub: PropTypes.string.isRequired,
  changeSub: PropTypes.func.isRequired,
  supervisors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Supervisors
