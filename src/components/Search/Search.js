import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from '../Breadcrumbs'
import TableWrap from '../TableWrap'
import getTabs from '../../utils/getTabs'

import './Search.scss'

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    // Reset all state params
    this.props.initTableContent()
  }

  getCrumbs() {
    return [{ url: null, name: 'Search' }]
  }

  render() {
    const { topics, supervisors } = this.props
    console.log('search')
    return (
      <div id="search-page">
        <Breadcrumbs crumbs={this.getCrumbs()} />
        <TableWrap
          tabs={getTabs({ topics, supervisors })}
          history={this.props.history}
        />
      </div>
    )
  }
}

Search.propTypes = {
  topics: PropTypes.object.isRequired,
  supervisors: PropTypes.object.isRequired,
  initTableContent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Search
