import React from 'react'
import queryString from 'query-string'
import { PropTypes } from 'prop-types'

import Topics from '../Topics/Topics'
import Supervisors from '../Supervisors/Supervisors'

import { Tabs, Icon } from 'antd'
const TabPane = Tabs.TabPane

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tableLoading: true,
      activeTab: this.getActiveTab(),
      activeSubs: this.getActiveSubs()
    }

    this.queryMap = {
      topics: props.getTopics,
      supervisors: props.getSupervisors
    }
  }

  componentDidMount() {
    this.queryMap[this.state.activeTab](
      this.props.curriculum.data._id,
      this.state.activeTab,
      this.state.activeSubs.topics
    )
  }

  render() {
    const { activeTab, activeSubs } = this.state
    const { topics, supervisors } = this.props
    const topicsCount = topics.count.all
    const supervisorsCount = supervisors.count.all

    return (
      <div className="curriculum-content">
        <br />
        <br />
        <Tabs
          animated={{ tabPane: false }}
          onChange={this.changeTab.bind(this)}
          defaultActiveKey={activeTab}
        >
          <TabPane
            disabled={topicsCount === 0}
            tab={
              <span>
                <Icon type="file-text" />Teemad{' '}
                {topicsCount > 0 && '| ' + topicsCount}
              </span>
            }
            key="topics"
          >
            <Topics
              topics={topics}
              changeSub={this.changeSub.bind(this)}
              activeSub={activeSubs.topics}
              activeTab={activeTab}
              loading={topics.loading}
            />
          </TabPane>
          <TabPane
            disabled={supervisorsCount === 0}
            tab={
              <span>
                <Icon type="user" />Juhendajad{' '}
                {supervisorsCount > 0 && '| ' + supervisorsCount}
              </span>
            }
            key="supervisors"
          >
            <Supervisors
              supervisors={supervisors}
              changeSub={this.changeSub.bind(this)}
              activeSub={activeSubs.supervisors}
              activeTab={activeTab}
              loading={supervisors.loading}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }

  getActiveTab() {
    const params = queryString.parse(this.props.history.location.search)
    const allowedTabs = ['topics', 'supervisors']
    const defaultTab = 'topics'
    return (
      (params.t && allowedTabs.indexOf(params.t) !== -1 ? params.t : null) ||
      defaultTab
    )
  }

  getActiveSubs() {
    const params = queryString.parse(this.props.history.location.search)
    const allowedTopicsSub = ['registered', 'available', 'defended', 'all']
    const allowedSuperSub = ['supervised', 'all']
    const defaultTopicSub = 'registered'
    const defaultSuperSub = 'supervised'

    return {
      topics:
        (params.sub && allowedTopicsSub.indexOf(params.sub) !== -1
          ? params.sub
          : null) || defaultTopicSub,
      supervisors:
        (params.sub && allowedSuperSub.indexOf(params.sub) !== -1
          ? params.sub
          : null) || defaultSuperSub
    }
  }

  changeTab(value) {
    //update URL
    let newUrl = this.props.history.location.pathname + '?t=' + value
    this.props.history.replace(newUrl)

    this.setState({ activeTab: value })
    this.setState({ activeSubs: this.getActiveSubs() })

    this.queryMap[value](
      this.props.curriculum.data._id,
      value,
      this.getActiveSubs()[value]
    )
  }

  changeSub(e) {
    const { value } = e.target

    const currentLocation = this.props.history.location.pathname
    const add = '?t=' + this.state.activeTab + '&sub=' + value
    this.props.history.replace(currentLocation + add)

    this.setState({ activeSubs: this.getActiveSubs() })

    this.queryMap[this.state.activeTab](
      this.props.curriculum.data._id,
      this.state.activeTab,
      value
    )
  }
}

ContentWrapper.propTypes = {
  history: PropTypes.object.isRequired,
  topics: PropTypes.object.isRequired,
  supervisors: PropTypes.object.isRequired,
  curriculum: PropTypes.object.isRequired,
  getTopics: PropTypes.func.isRequired,
  getSupervisors: PropTypes.func.isRequired
}

export default ContentWrapper
