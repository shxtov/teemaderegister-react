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

export default connect(mapStateToProps, {
  getCurriculum,
  initCurriculum,
  getTopics,
  initTopics,
  getSupervisors,
  initSupervisors
})(Curriculum)
