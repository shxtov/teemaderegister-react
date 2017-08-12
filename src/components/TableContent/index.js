import { connect } from 'react-redux'

import TableContent from './TableContent'

const mapStateToProps = state => ({
  tableContent: state.tableContent,

  curriculum: state.curriculum,
  supervisor: state.supervisor
})

export default connect(mapStateToProps)(TableContent)
