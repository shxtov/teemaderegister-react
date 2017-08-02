import { combineReducers } from 'redux'

import auth from './auth'
import login from './login'
import home from './home'
import curriculum from './curriculum'
import curriculumMeta from './curriculumMeta'

const rootReducer = combineReducers({
  auth,
  login,
  home,
  curriculum,
  curriculumMeta
})

export default rootReducer
