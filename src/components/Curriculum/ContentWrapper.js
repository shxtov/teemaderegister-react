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
          count: topicsCount.registered,
          columnKey: 'registered',
          order: 'descend'
        },
        {
          title: 'Available',
          key: 'available',
          count: topicsCount.available,
          columnKey: 'accepted',
          order: 'descend'
        },
        {
          title: 'Defended',
          key: 'defended',
          count: topicsCount.defended,
          columnKey: 'defended',
          order: 'descend'
        }
        // no need for this { title: 'All', key: 'all', count: topicsCount.all }
      ],
      supervisors: [
        {
          title: 'Supervised',
          key: 'supervised',
          count: supervisorsCount.supervised,
          columnKey: 'supervisors',
          order: 'ascend'
        },
        {
          title: 'All',
          key: 'all',
          count: supervisorsCount.all,
          columnKey: 'supervisors',
          order: 'ascend'
        }
      ]
    }

    let { tab, sub, page, columnKey, order, filters } = queryString.parse(
      props.history.location.search
    )

    // Fix limit to only available subs and tabs
    tab = tab && tabs[tab] ? tab : 'topics'
    sub =
      sub && subTabs[tab].filter(s => s.key === sub).length > 0
        ? sub
        : tabs[tab].defaultSub

    page = page || 1

    // TODO better map subs as object keys, refactor
    const subObj = subTabs[tab].filter(s => s.key === sub)[0]
    this.defaultColumnKey = subObj.columnKey
    this.defaultOrder = subObj.order
    this.hiddenOrder = 'ascend'

    columnKey = columnKey || this.defaultColumnKey
    console.log(columnKey)
    // FIX default ascend if not in url but there is columnKey
    order = order ? order : columnKey ? this.defaultOrder : this.hiddenOrder
    filters = filters ? JSON.parse(filters) : {}
    console.log(order)

    this.state = {
      tabs,
      subTabs,
      tab,
      sub,
      page,
      filters,
      columnKey,
      order
    }

    this.curriculum = props.curriculum.data._id
    this.queryMap = {
      topics: props.getTopics,
      supervisors: props.getSupervisors
    }

    this.tabUpdated = this.tabUpdated.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
  }

  componentDidMount() {
    const { tab, sub, page, columnKey, order, filters } = this.state
    const { curriculum, queryMap } = this
    queryMap[tab]({
      curriculum,
      tab,
      sub,
      hideLoading: true,
      page,
      columnKey,
      order,
      filters
    })
  }

  tabUpdated([tab, sub]) {
    const { subTabs } = this.state

    const page = 1
    const filters = {}

    const subObj = subTabs[tab].filter(s => s.key === sub)[0]
    const columnKey = subObj.columnKey
    const order = subObj.order

    this.writeURL({ tab, sub })
    this.setState({ tab, sub, page, columnKey, order, filters })
    const { curriculum, queryMap } = this
    queryMap[tab]({ curriculum, tab, sub, page, columnKey, order, filters })
    //TODO update document title
    //TODO check if it is needed to update
  }

  writeURL({ tab, sub, page, columnKey, order, filters }) {
    // Fix only sub if not default
    const newUrl =
      this.props.history.location.pathname +
      '?' +
      queryString.stringify({ tab }) +
      (sub && this.state.tabs[tab].defaultSub !== sub
        ? '&' + queryString.stringify({ sub })
        : '') +
      (page > 1 ? '&' + queryString.stringify({ page }) : '') +
      (columnKey ? '&' + queryString.stringify({ columnKey }) : '') +
      (order && order !== this.hiddenOrder
        ? '&' + queryString.stringify({ order })
        : '') +
      (filters ? '&' + queryString.stringify({ filters }) : '')

    this.props.history.replace(newUrl)
  }

  handleTableChange(pagination, filters, sorter) {
    const { columnKey, order } = sorter
    const { current } = pagination
    const { curriculum, queryMap } = this
    const { tab, sub } = this.state
    let page = current
    this.setState({ page, columnKey, order, filters })
    filters =
      JSON.stringify(filters) !== '{}' ? JSON.stringify(filters) : undefined
    this.writeURL({ tab, sub, page, columnKey, order, filters })
    queryMap[tab]({ curriculum, tab, sub, page, columnKey, order, filters })
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
          tabUpdated={this.tabUpdated}
          handleTableChange={this.handleTableChange}
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
