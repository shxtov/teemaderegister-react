import React from 'react'
import queryString from 'query-string'
import { PropTypes } from 'prop-types'

import Topics from '../Topics'
import Supervisors from '../Supervisors'
import TabsWrap from '../TabsWrap'

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props)

    const topicsCount = props.topics.count
    const supervisorsCount = props.supervisors.count

    const tabs = {
      topics: {
        icon: 'file-text',
        title: 'Topics',
        defaultSub: 'registered',
        count: topicsCount.all,
        ContentElement: Topics
      },
      supervisors: {
        icon: 'user',
        title: 'Supervisors',
        defaultSub: 'supervised',
        count: supervisorsCount.all,
        ContentElement: Supervisors
      }
    }

    const subTabs = {
      topics: [
        {
          title: 'Registered',
          key: 'registered',
          count: topicsCount.registered
        },
        {
          title: 'Available',
          key: 'available',
          count: topicsCount.available
        },
        { title: 'Defended', key: 'defended', count: topicsCount.defended }
        // no need for this { title: 'All', key: 'all', count: topicsCount.all }
      ],
      supervisors: [
        {
          title: 'Supervised',
          key: 'supervised',
          count: supervisorsCount.supervised
        },
        { title: 'All', key: 'all', count: supervisorsCount.all }
      ]
    }

    let { tab, sub } = queryString.parse(props.history.location.search)

    // Fix limit to only available subs and tabs
    tab = tab && tabs[tab] ? tab : 'topics'
    sub =
      sub && subTabs[tab].filter(s => s.key === sub).length > 0
        ? sub
        : tabs[tab].defaultSub

    this.state = {
      tabs,
      subTabs,
      tab,
      sub
    }

    this.curriculum = props.curriculum.data._id
    this.queryMap = {
      topics: props.getTopics,
      supervisors: props.getSupervisors
    }
  }

  componentDidMount() {
    const { tab, sub } = this.state
    const { curriculum, queryMap } = this
    queryMap[tab]({ curriculum, sub, initalLoad: true })
  }

  tabUpdated([tab, sub]) {
    this.writeURL({ tab, sub })
    this.setState({ tab, sub })
    const { curriculum, queryMap } = this
    queryMap[tab]({ curriculum, sub, initalLoad: false })
    //TODO update document title
    //TODO check if it is needed to update
  }

  writeURL({ tab, sub }) {
    // Fix only sub if not default
    const newUrl =
      this.props.history.location.pathname +
      '?tab=' +
      tab +
      (sub && this.state.tabs[tab].defaultSub !== sub ? '&sub=' + sub : '')
    this.props.history.replace(newUrl)
  }

  render() {
    const { tabs, tab, sub, subTabs } = this.state

    return (
      <div className="curriculum-content">
        <br />
        <br />
        <TabsWrap
          tabs={tabs}
          subTabs={subTabs}
          activeTab={tab}
          activeSub={sub}
          tabUpdated={this.tabUpdated.bind(this)}
        />
      </div>
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
