import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

import { Tabs, Icon, Radio } from 'antd'
const { TabPane } = Tabs
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

class TabsWrap extends Component {
  constructor(props) {
    super(props)

    this.updateTabs = this.updateTabs.bind(this)
  }

  createTabPanes(tabs, subTabs, activeSub) {
    return Object.keys(tabs).map(key => {
      const { title, icon, count, ContentElement } = tabs[key]
      return (
        <TabPane tab={this.createTabTitle(icon, title, count)} key={key}>
          {this.createSubTabs(subTabs[key], activeSub)}
          <ContentElement />
        </TabPane>
      )
    })
  }

  createSubTabs(subTabs) {
    const activeSub = this.props.activeSub || subTabs[0].key
    const subs = subTabs.map(sub => {
      const { title, key, count } = sub
      return (
        <RadioButton value={key} key={key}>
          {this.createSubTitle(title, count)}
        </RadioButton>
      )
    })

    return (
      <RadioGroup value={activeSub} onChange={this.updateTabs}>
        {subs}
      </RadioGroup>
    )
  }

  createTabTitle(icon, title, count) {
    return (
      <span>
        <Icon type={icon} />
        {title} {count > 0 && '| ' + count}
      </span>
    )
  }

  createSubTitle(title, count) {
    return (
      <span>
        {title} {count > 0 && '| ' + count}
      </span>
    )
  }

  updateTabs(e) {
    // tab - e
    // sub - e.target.value
    const { tabs, activeTab, tabUpdated } = this.props
    const subUpdated = e.target && e.target.value ? e.target.value : false

    const newTab = subUpdated ? activeTab : e
    const newSub = subUpdated || tabs[newTab].defaultSub

    return tabUpdated([newTab, newSub])
  }

  render() {
    const { tabs, subTabs, activeSub, activeTab } = this.props
    return (
      <Tabs
        animated={{ tabPane: false }}
        onChange={this.updateTabs}
        defaultActiveKey={activeTab}
      >
        {this.createTabPanes(tabs, subTabs, activeSub)}
      </Tabs>
    )
  }
}

TabsWrap.propTypes = {
  tabs: PropTypes.object.isRequired,
  subTabs: PropTypes.object.isRequired,
  activeTab: PropTypes.string,
  activeSub: PropTypes.string,
  tabUpdated: PropTypes.func.isRequired
}

export default TabsWrap
