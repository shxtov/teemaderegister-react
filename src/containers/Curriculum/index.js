import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { connect } from 'react-redux'
import { getCurriculumMeta, initCurriculum } from 'actions/CurriculumActions'

import CurriculumMeta from 'components/CurriculumMeta'
import CurriculumContentWrapper from 'components/CurriculumContentWrapper'

class Curriculum extends React.Component {
  constructor(props) {
    super(props)

    const { abbreviation } = this.props.match.params
    props.getCurriculumMeta(abbreviation)
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
    console.log('R:Curriculum')
    const { curriculumMeta } = this.props
    const { name } = curriculumMeta
    return (
      <div id="curriculum-page">
        {name &&
          <div>
            <Breadcrumbs crumbs={this.getCrumbs('name')} />
            <CurriculumMeta />
            <CurriculumContentWrapper />
          </div>}
      </div>
    )
  }
}

Curriculum.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getCurriculumMeta: PropTypes.func.isRequired,
  initCurriculum: PropTypes.func.isRequired,
  curriculumMeta: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    curriculumMeta: state.curriculumMeta.meta
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurriculumMeta: abbreviation =>
      dispatch(getCurriculumMeta(abbreviation)),
    initCurriculum: () => dispatch(initCurriculum())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Curriculum)
