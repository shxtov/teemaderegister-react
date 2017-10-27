import React from 'react'
import PropTypes from 'prop-types'
import './Home.scss'

import Collection from './Collection'

class Home extends React.Component {
  componentDidMount () {
    this.props.getCurriculums()
  }

  render () {
    const { loading, curriculums } = this.props.home

    return (
      <div id='home-page'>
        <div className='intro'>
          <h1>Tere tulemast DTI uue teemaderegistri lehele!!!!</h1>
        </div>
        {!loading && <Collection curriculums={curriculums} />}
      </div>
    )
  }
}

Home.propTypes = {
  getCurriculums: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired
}

export default Home
