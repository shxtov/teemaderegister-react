import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const initSupervisors = () => dispatch =>
  dispatch({ type: types.SUPERVISORS_INIT })

export const loadedSupervisorsCount = count => dispatch =>
  dispatch({ type: types.SUPERVISORS_LOADED_COUNT, count })

export const getSupervisors = (_id, tab, sub) => dispatch => {
  dispatch({ type: types.SUPERVISORS_STARTED_LOADING })

  const q = {
    params: {
      sub
    }
  }
  const url = '/curriculums/' + _id + '/' + tab

  return Api('GET', url, q)
    .then(({ data, count }) => {
      dispatch({ type: types.SUPERVISORS_LOADED, data, count, sub })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
