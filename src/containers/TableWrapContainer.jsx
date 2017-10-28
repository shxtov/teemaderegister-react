import React from 'react'
import { connect } from 'react-redux'
import TableWrap from '../components/TableWrap'

import {
  getTableContent,
  finishLoading
} from '../actions/TableContentActions'

const TableWrapContainer = props => <TableWrap {...props} />

const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, { getTableContent, finishLoading })(
  TableWrapContainer
)
