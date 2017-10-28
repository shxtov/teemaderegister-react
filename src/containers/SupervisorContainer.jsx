import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Supervisor from '../components/Supervisor'
import { getSupervisor, initSupervisor } from '../actions/SupervisorActions'
import {
  getTableContent,
  initTableContent,
  clearTableContent
} from '../actions/TableContentActions'

const SupervisorContainer = props => <Supervisor {...props} />

const mapStateToProps = state => ({
  supervisor: state.supervisor,
  topics: state.tableContent.topics,
  tableContent: state.tableContent
})

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {
      getSupervisor: slug => getSupervisor(slug || props.match.params.slug),
      initSupervisor,

      getTableContent,
      initTableContent,
      clearTableContent
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorContainer)
