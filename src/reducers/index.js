import { combineReducers } from 'redux'

import auth from './auth'
import curriculum from '../components/Curriculum/CurriculumReducers'
import home from '../components/Home/HomeReducers'
import login from '../components/Login/LoginReducers'
import supervisor from '../components/Supervisor/SupervisorReducers'
import tableContent from '../components/TableContent/TableContentReducers'
import search from '../components/Search/SearchReducer'

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
