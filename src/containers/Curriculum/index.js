import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { connect } from 'react-redux'
import {
  getSingleCurriculumData,
  initCurriculum
} from 'actions/CurriculumActions'

import CurriculumMeta from 'components/CurriculumMeta'

class Curriculum extends React.Component {
  constructor(props) {
    super(props)

    const { abbreviation } = this.props.match.params
    props.getSingleCurriculumData(abbreviation)
  }

  getCrumbs(name) {
    return [
      { url: null, name: 'Curriculum' },
      { url: this.props.location.pathname, name }
    ]
  }

  componentWillUnmount() {
    this.props.initCurriculum()
  }

  render() {
    const { curriculumMeta } = this.props.curriculum

    return (
      <div id="curriculum-page">
        {/*TODO check for loading instead*/}
        {curriculumMeta._id &&
          <div>
            <Breadcrumbs crumbs={this.getCrumbs(curriculumMeta.name)} />
            <CurriculumMeta curriculumMeta={curriculumMeta} />
          </div>}
      </div>
    )
  }
}

Curriculum.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getSingleCurriculumData: PropTypes.func.isRequired,
  initCurriculum: PropTypes.func.isRequired,
  curriculum: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    curriculum: state.curriculum
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleCurriculumData: abbreviation =>
      dispatch(getSingleCurriculumData(abbreviation)),
    initCurriculum: () => dispatch(initCurriculum())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Curriculum)
