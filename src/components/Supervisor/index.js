import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Supervisor from './Supervisor'
import { getSupervisor, initSupervisor } from './SupervisorActions.js'
import {
  getTableContent,
  initTableContent
} from '../TableContent/TableContentActions'

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
export default connect(mapStateToProps, mapDispatchToProps)(Supervisor)
