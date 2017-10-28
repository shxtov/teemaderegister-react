import React from 'react'
import { connect } from 'react-redux'

import Home from '../components/Home'
import { getCurriculums } from '../actions/CurriculumActions'

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => ({
  home: state.home
})

export default connect(mapStateToProps, {
  getCurriculums
})(HomeContainer)
