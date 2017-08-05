import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const initSupervisors = () => dispatch =>
  dispatch({ type: types.SUPERVISORS_INIT })

export const loadedSupervisorsCount = count => dispatch =>
  dispatch({ type: types.SUPERVISORS_LOADED_COUNT, count })

export const getSupervisors = params => dispatch => {
  if (!params.hideLoading) dispatch({ type: types.TOPICS_STARTED_LOADING })

  const q = {
    params
  }

  return Api('GET', '/supervisors', q)
    .then(({ data, count, query }) => {
      dispatch({ type: types.SUPERVISORS_LOADED, data, count, query })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
