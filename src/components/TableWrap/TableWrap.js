import React from 'react'
import { PropTypes } from 'prop-types'
import queryString from 'query-string'

import { removeEmpty } from '../../utils/helpers'
import setUrl from '../../utils/setUrl'
import TabsWrap from '../TabsWrap'

class TableWrap extends React.Component {
  constructor(props) {
    super(props)

    this.tabs = props.tabs
    this.defaultTab = props.defaultTab || 'topics'
    this.queryExtend = props.queryExtend || {}

    let {
      tab,
      sub,

      //pagination
      page,

      //sort
      columnKey,
      order,

      //all allowed filters
      types,
      curriculums
    } = queryString.parse(props.history.location.search, {
      arrayFormat: 'bracket'
    })

    this.defaultPage = 1
    page = page || this.defaultPage

    // Fix limit to only available subs and tabs
    tab = tab && this.tabs[tab] ? tab : this.defaultTab
    const tabObj = this.tabs[tab]

    sub = sub && tabObj.subs[sub] ? sub : tabObj.sub
    const subObj = tabObj.subs[sub]
    columnKey = columnKey || subObj.columnKey

    // FIX default ascend if not in url but there is columnKey
    this.defaultOrder = 'ascend'
    order = order ? order : subObj.order

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
    this.props.getTableContent(
      Object.assign(this.queryExtend, this.state),
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
          tabs={this.props.tabs}
          activeTab={this.state.tab}
          activeSub={this.state.sub}
          tabUpdated={this.tabUpdated}
          handleTableChange={this.handleTableChange}
        />
      </div>
    )
  }
}

TableWrap.propTypes = {
  tabs: PropTypes.object,
  defaultTab: PropTypes.object,
  queryExtend: PropTypes.object,

  getTableContent: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired
}

export default TableWrap
