import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const initSupervisors = () => dispatch =>
  dispatch({ type: types.SUPERVISORS_INIT })

export const loadedSupervisorsCount = count => dispatch =>
  dispatch({ type: types.SUPERVISORS_LOADED_COUNT, count })

export const getSupervisors = ({ curriculumId, tab, sub }) => dispatch => {
  dispatch({ type: types.SUPERVISORS_STARTED_LOADING })

  const q = {
    params: {
      sub
    }
  }
  const url = '/curriculums/' + curriculumId + '/' + tab

  return Api('GET', url, q)
    .then(({ data, count, query }) => {
      dispatch({ type: types.SUPERVISORS_LOADED, data, count, query })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
