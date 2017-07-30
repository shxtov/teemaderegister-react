import React from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { connect } from 'react-redux'

class Curriculum extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const abbreviation = this.props.match.params.abbreviation
    return (
      <div id="curriculum-page">
        <Breadcrumbs
          crumbs={[
            { url: null, name: 'Curriculum' },
            { url: this.props.location.pathname, name: 'Full name here' }
          ]}
        />
        Curriculum: {abbreviation}
      </div>
    )
  }
}

Curriculum.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default connect()(Curriculum)
