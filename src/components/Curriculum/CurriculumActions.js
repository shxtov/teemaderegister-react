import * as types from '../../constants/ActionTypes'
import { loadedTopicsCount } from '../Topics/TopicsActions'
import { loadedSupervisorsCount } from '../Supervisors/SupervisorsActions'
import Api from '../../utils/api'

export const initCurriculum = () => dispatch => {
  dispatch({ type: types.CURRICULUM_INIT })
}

export const getCurriculum = abbreviation => dispatch => {
  return Api('GET', '/curriculums/' + abbreviation)
    .then(response => {
      const { data, supervisors, topics } = response

      dispatch({ type: types.CURRICULUM_LOADED, data })

      dispatch(loadedTopicsCount(topics))
      dispatch(loadedSupervisorsCount(supervisors))
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
