import React from 'react'
import { connect } from 'react-redux'

import TableContent from '../components/TableContent'

const TableContentContainer = props => <TableContent {...props} />

const mapStateToProps = state => ({
  tableContent: state.tableContent,

  curriculum: state.curriculum,
  supervisor: state.supervisor
})

export default connect(mapStateToProps)(TableContentContainer)
