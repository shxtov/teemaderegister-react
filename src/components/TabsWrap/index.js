import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import TableContent from '../TableContent'
import { Tabs, Icon, Radio } from 'antd'

class TabsWrap extends Component {
  constructor (props) {
    super(props)

    this.updateTabs = this.updateTabs.bind(this)
    this.tabClicked = this.tabClicked.bind(this)
  }

  createTabPanes (tabs) {
    return Object.keys(tabs).map(key => {
      const { title, icon, count, subs } = tabs[key]
      return (
        <Tabs.TabPane tab={this.createTabTitle(icon, title, count)} key={key}>
          {this.createSubTabs(subs)}
          <TableContent
            tableKey={key}
            handleTableChange={this.props.handleTableChange}
          />
        </Tabs.TabPane>
      )
    })
  }

  createSubTabs (subs) {
    const { activeSub } = this.props

    subs = Object.keys(subs).map(key => {
      const { title, count } = subs[key]
      return (
        <Radio.Button value={key} key={key}>
          {this.createSubTitle(title, count)}
        </Radio.Button>
      )
    })

    return (
      <Radio.Group value={activeSub} onChange={this.updateTabs}>
        {subs}
      </Radio.Group>
    )
  }

  createTabTitle (icon, title, count) {
    return (
      <span>
        <Icon type={icon} />
        {title} {count > 0 && '| ' + count}
      </span>
    )
  }

  createSubTitle (title, count) {
    return (
      <span>
        {title} {count > 0 && '| ' + count}
      </span>
    )
  }
  tabClicked (e) {
    // clear filters
    // tab - e
    const { activeTab, tabs, tabUpdated } = this.props
    // tab updated
    if (activeTab === e) { return tabUpdated([activeTab, tabs[activeTab].defaultSub]) }
  }
  updateTabs (e) {
    // tab - e
    // sub - e.target.value
    const { tabs, activeTab, tabUpdated } = this.props
    const subUpdated = e.target && e.target.value ? e.target.value : false

    const newTab = subUpdated ? activeTab : e
    const newSub = subUpdated || tabs[newTab].defaultSub

    return tabUpdated([newTab, newSub])
  }

  render () {
    const { tabs, activeTab } = this.props
    return (
      <Tabs
        animated={{ tabPane: false }}
        onChange={this.updateTabs}
        defaultActiveKey={activeTab}
        onTabClick={this.tabClicked}
      >
        {this.createTabPanes(tabs)}
      </Tabs>
    )
  }
}

TabsWrap.propTypes = {
  tabs: PropTypes.object.isRequired,
  activeTab: PropTypes.string,
  activeSub: PropTypes.string,
  tabUpdated: PropTypes.func.isRequired,
  handleTableChange: PropTypes.func.isRequired
}

export default TabsWrap
