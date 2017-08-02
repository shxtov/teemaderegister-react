import React from 'react'
import PropTypes from 'prop-types'
import './Home.scss'

import TypeCollection from './TypeCollection'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCurriculums()
  }

  render() {
    const { loading, curriculums } = this.props.home

    return (
      <div id="home-page">
        <div className="intro">
          <h1>Tere tulemast DTI uue teemaderegistri lehele</h1>
        </div>
        {!loading && getCards(curriculums)}
      </div>
    )
  }
}

const getCards = curriculums => {
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
        <TypeCollection type={type} collection={collection} />
      </div>
    )
  })
}

Home.propTypes = {
  getCurriculums: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired
}

export default Home
