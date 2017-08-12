import { combineReducers } from 'redux'

import auth from './auth'
import curriculum from '../components/Curriculum/CurriculumReducers'
import home from '../components/Home/HomeReducers'
import login from '../components/Login/LoginReducers'
import supervisors from '../components/Supervisors/SupervisorsReducers'
import topics from '../components/Topics/TopicsReducers'
import supervisor from '../components/Supervisor/SupervisorReducers'
import tableContent from '../components/TableContent/TableContentReducers'

const rootReducer = combineReducers({
  auth,
  curriculum,
  home,
  login,
  supervisors,
  topics,
  supervisor,
  tableContent
})

export default rootReducer
