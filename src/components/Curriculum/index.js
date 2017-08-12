import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Curriculum from './Curriculum'
import { getCurriculum, initCurriculum } from './CurriculumActions.js'
import {
  getTableContent,
  initTableContent
} from '../TableContent/TableContentActions'

const mapStateToProps = state => ({
  curriculum: state.curriculum,

  topics: state.tableContent.topics,
  supervisors: state.tableContent.supervisors
})

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {
      getCurriculum: () => getCurriculum(props.match.params.slug),
      initCurriculum,

      getTableContent,
      initTableContent
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(Curriculum)
