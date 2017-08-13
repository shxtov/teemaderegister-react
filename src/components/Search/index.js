import { connect } from 'react-redux'

import Search from './Search'
import { initTableContent } from '../TableContent/TableContentActions'

const mapStateToProps = state => ({
  topics: state.tableContent.topics,
  supervisors: state.tableContent.supervisors
})

export default connect(mapStateToProps, { initTableContent })(Search)
