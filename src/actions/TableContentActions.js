import * as types from '../constants/ActionTypes'
import Api from '../utils/Api'

export const initTableContent = () => dispatch =>
  dispatch({ type: types.TABLE_CONTENT_INIT })

export const loadedTableContentCount = ({ topics, supervisors }) => dispatch =>
  dispatch({ type: types.TABLE_CONTENT_LOADED_COUNT, topics, supervisors })

export const finishLoading = params => dispatch =>
  dispatch({ type: types.TABLE_CONTENT_FINISH_LOADING, params })

export const getTableContent = (params, showLoading) => dispatch => {
  if (showLoading) dispatch({ type: types.TABLE_CONTENT_STARTED_LOADING })

  return Api('GET', '/' + params.tab, { params })
    .then(({ topics, supervisors, count, query }) => {
      dispatch({ type: types.TABLE_CONTENT_LOADED, topics, supervisors, count, query })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
