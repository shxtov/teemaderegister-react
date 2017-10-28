import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Supervisor from '../components/Supervisor'
import { getSupervisor, initSupervisor } from '../actions/SupervisorActions'
import {
  getTableContent,
  initTableContent
} from '../actions/TableContentActions'

const SupervisorContainer = props => <Supervisor {...props} />

const mapStateToProps = state => ({
  supervisor: state.supervisor,
  topics: state.tableContent.topics
})

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {
      getSupervisor: slug => getSupervisor(slug || props.match.params.slug),
      initSupervisor,

      getTableContent,
      initTableContent
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(SupervisorContainer)
