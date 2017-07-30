import { combineReducers } from 'redux'

import auth from './auth'
import login from './login'
import home from './home'
import curriculum from './curriculum'

const rootReducer = combineReducers({
  auth,
  login,
  home,
  curriculum
})

export default rootReducer
