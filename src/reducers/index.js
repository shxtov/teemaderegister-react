import { combineReducers } from 'redux'

import auth from './auth'
import login from './login'
import home from './home'

const rootReducer = combineReducers({
  auth,
  login,
  home
})

export default rootReducer
