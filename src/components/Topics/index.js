import { connect } from 'react-redux'
import Topics from './Topics'

const mapStateToProps = state => ({
  topics: state.topics
})

export default connect(mapStateToProps)(Topics)
