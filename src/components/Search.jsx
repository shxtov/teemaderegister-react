import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'
import TableWrapContainer from '../containers/TableWrapContainer'
import getTabs from '../utils/getTabs'

class Search extends React.Component {
  componentWillUnmount () {
    // Reset all state params
    this.props.initTableContent()
    this.props.initSearch()
  }

  getCrumbs () {
    return [{ url: null, name: 'Search' }]
  }

  render () {
    const { topics, supervisors, search } = this.props
    const { loading } = search
    return (
      <div id='search-page'>
        {!loading &&
          <div>
            <Breadcrumbs crumbs={this.getCrumbs()} />
            <TableWrapContainer
              tabs={getTabs({ topics, supervisors })}
              history={this.props.history}
            />
          </div>}
      </div>
    )
  }
}

Search.propTypes = {
  topics: PropTypes.object.isRequired,
  supervisors: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  initTableContent: PropTypes.func.isRequired,
  initSearch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Search
