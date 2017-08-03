import { connect } from 'react-redux'
import Topics from './Topics'

const mapStateToProps = state => ({
  topics: state.topics,
  curriculum: state.curriculum
})

export default connect(mapStateToProps)(Topics)
