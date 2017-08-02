import { combineReducers } from 'redux'

import auth from './auth'
import curriculum from '../components/Curriculum/CurriculumReducers'
import home from '../components/Home/HomeReducers'
import login from '../components/Login/LoginReducers'
import supervisors from '../components/Supervisors/SupervisorsReducers'
import topics from '../components/Topics/TopicsReducers'

const rootReducer = combineReducers({
  auth,
  curriculum,
  home,
  login,
  supervisors,
  topics
})

export default rootReducer
