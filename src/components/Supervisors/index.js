import { connect } from 'react-redux'
import Supervisors from './Supervisors'

const mapStateToProps = state => ({
  supervisors: state.supervisors
})

export default connect(mapStateToProps)(Supervisors)
