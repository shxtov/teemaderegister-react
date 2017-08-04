import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Curriculum from './Curriculum'
import { getCurriculum, initCurriculum } from './CurriculumActions.js'
import { getTopics, initTopics } from '../Topics/TopicsActions'
import {
  getSupervisors,
  initSupervisors
} from '../Supervisors/SupervisorsActions'

const mapStateToProps = state => ({
  curriculum: state.curriculum,
  topics: state.topics,
  supervisors: state.supervisors
})

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {
      getCurriculum: () => getCurriculum(props.match.params.abbreviation),
      initCurriculum,
      getTopics,
      initTopics,
      getSupervisors,
      initSupervisors
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(Curriculum)
