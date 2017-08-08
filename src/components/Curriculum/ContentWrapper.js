import React from 'react'
import queryString from 'query-string'
import { PropTypes } from 'prop-types'
import { removeEmpty } from '../../utils/helpers'
import setUrl from '../../utils/setUrl'
import Topics from '../Topics'
import Supervisors from '../Supervisors'
import TabsWrap from '../TabsWrap'

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props)

    const topicsCount = props.topics.count
    const supervisorsCount = props.supervisors.count

    this.tabs = {
      topics: {
        icon: 'file-text',
        title: 'Topics',
        sub: 'registered',
        count: topicsCount.all,
        ContentElement: Topics,
        subs: {
          registered: {
            title: 'Registered',
            count: topicsCount.registered,
            columnKey: 'registered',
            order: 'descend'
          },
          available: {
            title: 'Available',
            count: topicsCount.available,
            columnKey: 'accepted',
            order: 'descend'
          },
          defended: {
            title: 'Defended',
            count: topicsCount.defended,
            columnKey: 'defended',
            order: 'descend'
          }
        }
      },
      supervisors: {
        icon: 'user',
        title: 'Supervisors',
        sub: 'supervised',
        count: supervisorsCount.all,
        ContentElement: Supervisors,
        subs: {
          supervised: {
            title: 'Supervised',
            count: supervisorsCount.supervised,
            columnKey: 'supervisor',
            order: 'ascend'
          },
          all: {
            title: 'All',
            count: supervisorsCount.all,
            columnKey: 'supervisor',
            order: 'ascend'
          }
        }
      }
    }

    let {
      tab,
      sub,

      //pagination
      page,

      //sort
      columnKey,
      order,

      //filters
      types,
      curriculums
    } = queryString.parse(props.history.location.search, {
      arrayFormat: 'bracket'
    })

    this.defaultPage = 1
    page = page || this.defaultPage

    // Fix limit to only available subs and tabs
    this.defaultTab = 'topics'
    tab = tab && this.tabs[tab] ? tab : this.defaultTab
    const tabObj = this.tabs[tab]

    sub = sub && tabObj.subs[sub] ? sub : tabObj.sub
    const subObj = tabObj.subs[sub]
    columnKey = columnKey || subObj.columnKey

    // FIX default ascend if not in url but there is columnKey
    this.defaultOrder = 'ascend'
    order = order ? order : subObj.order

    this.queryMap = {
      topics: props.getTopics,
      supervisors: props.getSupervisors
    }

    this.state = {
      tab,
      sub,
      page,
      columnKey,
      order,
      types,
      curriculums
    }

    this.tabUpdated = this.tabUpdated.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
  }

  componentDidMount() {
    this.makeQuery()
  }

  getDefaults({ tab, sub }) {
    const tabObj = this.tabs[tab]

    sub = sub || tabObj.sub
    const { columnKey, order } = tabObj.subs[sub]
    return {
      sub,
      columnKey,
      order,
      page: this.defaultPage,
      types: undefined,
      curriculums: undefined
    }
  }

  makeQuery(showLoading) {
    const { tab } = this.state
    const curriculumId = this.props.curriculum.data._id
    this.queryMap[tab](
      Object.assign({ curriculumId }, this.state),
      showLoading || false
    )
  }

  tabUpdated([tab, sub]) {
    const newState = Object.assign({ tab }, this.getDefaults({ tab, sub }))
    const showLoading = true

    this.setState(newState, () => {
      this.writeURL()
      this.makeQuery(showLoading)
    })

    //TODO update document title
    //TODO check if it is needed to update
  }

  writeURL() {
    const { replace, location } = this.props.history
    const { tab, sub, columnKey } = this.state

    // FIX overwrite sub to be default sub no matter what,
    // to preserve other subs in url
    let defaults = this.getDefaults({ tab, sub })
    defaults = Object.assign(defaults, {
      tab: this.defaultTab,
      sub: this.tabs[tab].sub,
      order:
        columnKey === defaults.columnKey ? defaults.order : this.defaultOrder
    })

    setUrl(replace, location.pathname, this.state, defaults)
  }

  handleTableChange(pagination, filters, sorter) {
    const { columnKey, order } = sorter
    const page = pagination.current
    filters = removeEmpty(filters)
    const { types, curriculums } = filters
    const showLoading = true

    this.setState({ page, columnKey, order, types, curriculums }, () => {
      this.writeURL()
      this.makeQuery(showLoading)
    })
  }

  render() {
    return (
      <div className="curriculum-content">
        <br />
        <br />
        <TabsWrap
          tabs={this.tabs}
          activeTab={this.state.tab}
          activeSub={this.state.sub}
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
