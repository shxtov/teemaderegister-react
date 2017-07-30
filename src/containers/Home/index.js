import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCurriculums } from 'actions/HomeActions'
import CurriculumTypeCollection from 'components/CurriculumTypeCollection'

import './home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)

    props.loadCurriculums()
  }

  render() {
    let { loading, curriculums } = this.props.home

    let cards = []
    curriculums.forEach((single, i) => {
      const { type, collection } = single
      cards.push(
        <div className="home-curriculums" key={i}>
          <h1>
            {type}
          </h1>
          <CurriculumTypeCollection type={type} collection={collection} />
        </div>
      )
    })

    return (
      <div id="home-page">
        <div className="intro">
          <h1>Tere tulemast DTI uue teemaderegistri lehele</h1>
        </div>
        {!loading && cards}
      </div>
    )
  }
}

Home.propTypes = {
  loadCurriculums: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    home: state.home
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCurriculums: () => dispatch(loadCurriculums())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
