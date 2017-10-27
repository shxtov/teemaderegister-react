import React from 'react'
import PropTypes from 'prop-types'

import Breadcrumbs from '../Breadcrumbs'
import Meta from './Meta'
import TableWrap from '../TableWrap'
import getTabs from '../../utils/getTabs'

import './Supervisor.scss'

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
    const { topics, supervisor: { loading, data, count } } = this.props
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
            <Meta data={data} count={count} />
            <TableWrap
              tabs={getTabs({ topics })}
              queryExtend={{ supervisorId: data._id }}
              history={this.props.history}
            />
          </div>}
      </div>
    )
  }
}

Supervisor.propTypes = {
  supervisor: PropTypes.object.isRequired,
  getSupervisor: PropTypes.func.isRequired,
  initSupervisor: PropTypes.func.isRequired,

  topics: PropTypes.object.isRequired,
  initTableContent: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default Supervisor
