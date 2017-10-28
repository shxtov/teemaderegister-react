import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Curriculum from '../components/Curriculum'
import { getCurriculum, initCurriculum } from '../actions/CurriculumActions'
import {
  getTableContent,
  initTableContent,
  clearTableContent
} from '../actions/TableContentActions'

const CurriculumContainer = props => <Curriculum {...props} />

const mapStateToProps = state => ({
  curriculum: state.curriculum,
  topics: state.tableContent.topics,
  supervisors: state.tableContent.supervisors,
  tableContent: state.tableContent
})

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators(
    {
      getCurriculum: () => getCurriculum(props.match.params.slug),
      initCurriculum,

      getTableContent,
      initTableContent,
      clearTableContent
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(CurriculumContainer)
