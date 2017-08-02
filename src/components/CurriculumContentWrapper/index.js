import React from 'react'
import queryString from 'query-string'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { getCurriculumData } from 'actions/CurriculumActions'
import { withRouter } from 'react-router'

import { Tabs, Icon, Badge } from 'antd'
const TabPane = Tabs.TabPane

import TopicsTable from 'components/TopicsTable'
import SupervisorsTable from 'components/SupervisorsTable'

class CurriculumContentWrapper extends React.Component {
  constructor(props) {
    super(props)

    //console.log(props)

    this.state = {
      tableLoading: true,
      activeTab: this.getActiveTab(),
      activeSubs: this.getActiveSubs()
    }

    //console.log(this.state)

    // TODO small ms difference in execution, do active tab first

    /*props.getCurriculumData(
      props.curriculum.curriculumMeta._id,
      'supervisors',
      this.state.activeSubs.supervisors
    )*/
  }

  componentDidMount() {
    this.props.getCurriculumData(
      this.props.curriculumMeta._id,
      this.state.activeTab,
      this.state.activeSubs.topics,
      true
    )
  }

  render() {
    console.log('R:CurriculumContentWrapper')
    const { activeTab, activeSubs } = this.state

    // TODO do not show loading when small delay
    const { topics, supervisors, loading } = this.props.curriculum
    const { history } = this.props
    const topicsCount = topics.count.all
    const supervisorsCount = supervisors.count.all
    //console.log(topics.data)

    // console.log(activeSubs.topics)

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
            <TopicsTable
              topics={topics}
              changeSub={this.changeSub.bind(this)}
              activeSub={activeSubs.topics}
              activeTab={activeTab}
              tableLoading={loading}
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
            <SupervisorsTable
              supervisors={supervisors}
              changeSub={this.changeSub.bind(this)}
              activeSub={activeSubs.supervisors}
              activeTab={activeTab}
              tableLoading={loading}
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

  changeTab(key) {
    //update URL
    let newUrl = this.props.history.location.pathname + '?t=' + key
    this.props.history.replace(newUrl)

    this.setState({ activeTab: key })
    this.setState({ activeSubs: this.getActiveSubs() })

    this.props.getCurriculumData(
      this.props.curriculumMeta._id,
      key,
      this.getActiveSubs()[key],
      false
    )
  }

  changeSub(e) {
    const key = e.target.value

    const currentLocation = this.props.history.location.pathname
    const add = '?t=' + this.state.activeTab + '&sub=' + key
    this.props.history.replace(currentLocation + add)

    this.setState({ activeSubs: this.getActiveSubs() })
    this.props.getCurriculumData(
      this.props.curriculumMeta._id,
      this.state.activeTab,
      key,
      false
    )
  }
}

CurriculumContentWrapper.propTypes = {
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    curriculum: state.curriculum,
    curriculumMeta: state.curriculumMeta.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurriculumData: (_id, tab, sub) =>
      dispatch(getCurriculumData(_id, tab, sub))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(CurriculumContentWrapper)
)
