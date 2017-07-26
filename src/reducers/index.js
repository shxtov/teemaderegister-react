import { combineReducers } from 'redux'

import auth from './auth'
import login from './login'

const rootReducer = combineReducers({
  auth,
  login
})

export default rootReducer
