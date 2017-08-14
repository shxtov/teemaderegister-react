import { connect } from 'react-redux'

import Search from './Search'
import { initTableContent } from '../TableContent/TableContentActions'
import { initSearch } from './SearchActions'

const mapStateToProps = state => ({
  topics: state.tableContent.topics,
  supervisors: state.tableContent.supervisors,
  search: state.search
})

export default connect(mapStateToProps, {
  initTableContent,
  initSearch
})(Search)
