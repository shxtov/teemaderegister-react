import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'
import TableWrap from '../components/TableWrap'
import getTabs from '../utils/getTabs'
import CurriculumMeta from './CurriculumMeta'

const propTypes = {
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

class Curriculum extends React.Component {
  componentDidMount () {
    this.props.getCurriculum()
  }

  componentWillUnmount () {
    // Reset all state params
    this.props.initCurriculum()
    this.props.initTableContent()
  }

  getCrumbs (name) {
    return [
      { url: null, name: 'Curriculum' },
      { url: this.props.location.pathname, name }
    ]
  }

  render () {
    const {
      curriculum,
      curriculum: { meta, loading },
      topics,
      supervisors,
      getTableContent,
      clearTableContent,
      tableContent
    } = this.props

    return (
      <div id='curriculum-page'>
        {!loading &&
          <div>
            <Breadcrumbs crumbs={this.getCrumbs(meta.names.et)} />
            <CurriculumMeta meta={meta} />
            <TableWrap
              tabs={getTabs({ topics, supervisors })}
              queryExtend={{ curriculumId: meta._id }}
              history={this.props.history}
              getTableContent={getTableContent}
              clearTableContent={clearTableContent}
              curriculum={curriculum}
              tableContent={tableContent}
            />
          </div>}
      </div>
    )
  }
}

Curriculum.propTypes = propTypes

export default Curriculum
