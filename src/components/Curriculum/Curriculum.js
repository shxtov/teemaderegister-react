import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from '../Breadcrumbs'

import Meta from './Meta'
import ContentWrapper from './ContentWrapper'

class Curriculum extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { abbreviation } = this.props.match.params
    this.props.getCurriculum(abbreviation)
  }

  componentWillUnmount() {
    // Reset all state params
    this.props.initCurriculum()
    // only reset if exists
    if (this.props.topics.data.length > 0) this.props.initTopics()
    if (this.props.supervisors.data.length > 0) this.props.initSupervisors()
  }

  getCrumbs(name) {
    return [
      { url: null, name: 'Curriculum' },
      { url: this.props.location.pathname, name }
    ]
  }

  render() {
    const { data, loading } = this.props.curriculum
    return (
      <div id="curriculum-page">
        {!loading &&
          <div>
            <Breadcrumbs crumbs={this.getCrumbs(data.name)} />
            <Meta {...this.props.curriculum} />
            <ContentWrapper {...this.props} />
          </div>}
      </div>
    )
  }
}

Curriculum.propTypes = {
  curriculum: PropTypes.object.isRequired,
  getCurriculum: PropTypes.func.isRequired,
  initCurriculum: PropTypes.func.isRequired,
  initSupervisors: PropTypes.func.isRequired,
  initTopics: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  supervisors: PropTypes.object.isRequired,
  topics: PropTypes.object.isRequired
}

export default Curriculum
