import { connect } from 'react-redux'
import { getCurriculums } from './HomeActions'
import Home from './Home'

const mapStateToProps = state => ({
  home: state.home
})

export default connect(mapStateToProps, { getCurriculums })(Home)
