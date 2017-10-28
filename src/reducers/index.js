import { combineReducers } from 'redux'

import auth from './AuthReducers'
import curriculum from './CurriculumReducers'
import home from './HomeReducers'
import login from './LoginReducers'
import supervisor from './SupervisorReducers'
import tableContent from './TableContentReducers'
import search from './SearchReducer'

const rootReducer = combineReducers({
  auth,
  curriculum,
  home,
  login,
  supervisor,
  tableContent,
  search
})

export default rootReducer
