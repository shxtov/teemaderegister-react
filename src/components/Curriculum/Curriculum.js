import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from '../Breadcrumbs'
import TableWrap from '../TableWrap'
import getTabs from '../../utils/getTabs'
import Meta from './Meta'

import './Curriculum.scss'

class Curriculum extends React.Component {
  componentDidMount() {
    this.props.getCurriculum()
  }

  componentWillUnmount() {
    // Reset all state params
    this.props.initCurriculum()
    this.props.initTableContent()
  }

  getCrumbs(name) {
    return [
      { url: null, name: 'Curriculum' },
      { url: this.props.location.pathname, name }
    ]
  }

  render() {
    const { data, loading } = this.props.curriculum
    const { topics, supervisors } = this.props
    return (
      <div id="curriculum-page">
        {!loading &&
          <div>
            <Breadcrumbs crumbs={this.getCrumbs(data.names.et)} />
            <Meta data={data} />
            <TableWrap
              tabs={getTabs({ topics, supervisors })}
              queryExtend={{ curriculumId: data._id }}
              history={this.props.history}
            />
          </div>}
      </div>
    )
  }
}

Curriculum.propTypes = {
  curriculum: PropTypes.object.isRequired,
  getCurriculum: PropTypes.func.isRequired,
  initCurriculum: PropTypes.func.isRequired,

  topics: PropTypes.object.isRequired,
  supervisors: PropTypes.object.isRequired,
  initTableContent: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default Curriculum
