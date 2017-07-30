import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadHomeCurriculums } from 'actions/CurriculumActions'
import CurriculumTypeCollection from 'components/CurriculumTypeCollection'

import './home.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)

    props.loadHomeCurriculums()
  }

  getCards(curriculums) {
    return curriculums.map(single => {
      const { type, collection } = single
      const typeMap = {
        BA: 'Bakalaureuseõpe',
        MA: 'Magistriõpe',
        PHD: 'Doktoriõpe'
      }
      return (
        <div className="home-curriculums" key={type}>
          <h1>
            {typeMap[type]}
          </h1>
          <CurriculumTypeCollection type={type} collection={collection} />
        </div>
      )
    })
  }

  render() {
    let { loading, curriculums } = this.props.home

    return (
      <div id="home-page">
        <div className="intro">
          <h1>Tere tulemast DTI uue teemaderegistri lehele</h1>
        </div>
        {!loading && this.getCards(curriculums)}
      </div>
    )
  }
}

Home.propTypes = {
  loadHomeCurriculums: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    home: state.home
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadHomeCurriculums: () => dispatch(loadHomeCurriculums())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
