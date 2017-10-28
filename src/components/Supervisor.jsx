import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from './Breadcrumbs'
import SupervisorMeta from './SupervisorMeta'
import TableWrap from '../components/TableWrap'
import getTabs from '../utils/getTabs'

const propTypes = {
  supervisor: PropTypes.object.isRequired,
  getSupervisor: PropTypes.func.isRequired,
  initSupervisor: PropTypes.func.isRequired,

  topics: PropTypes.object.isRequired,
  initTableContent: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

class Supervisor extends React.Component {
  componentWillReceiveProps (nextProps) {
    // FIX new supervisor slug update view
    const isNewSlug =
      this.props.match.params.slug !== nextProps.match.params.slug

    if (isNewSlug) {
      this.init()
      this.props.getSupervisor(nextProps.match.params.slug)
    }
  }

  componentDidMount () {
    this.props.getSupervisor()
  }

  componentWillUnmount () {
    // Reset all state params
    this.init()
  }

  init () {
    this.props.initSupervisor()
    this.props.initTableContent()
  }

  getCrumbs (name) {
    return [
      { url: null, name: 'Supervisor' },
      { url: this.props.location.pathname, name }
    ]
  }

  render () {
    const {
      topics,
      supervisor,
      supervisor: { loading, data, count },
      getTableContent,
      clearTableContent,
      tableContent
    } = this.props

    const { profile } = data
    return (
      <div id='supervisor-page'>
        {!loading &&
          <div>
            <Breadcrumbs
              crumbs={this.getCrumbs(
                profile.firstName + ' ' + profile.lastName
              )}
            />
            <br />
            <SupervisorMeta data={data} count={count} />
            <TableWrap
              tabs={getTabs({ topics })}
              queryExtend={{ supervisorId: data._id }}
              history={this.props.history}
              getTableContent={getTableContent}
              clearTableContent={clearTableContent}
              supervisor={supervisor}
              tableContent={tableContent}
            />
          </div>}
      </div>
    )
  }
}

Supervisor.propTypes = propTypes

export default Supervisor
