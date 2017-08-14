import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const initTableContent = () => dispatch =>
  dispatch({ type: types.TABLE_CONTENT_INIT })

export const loadedTableContentCount = ({ topics, supervisors }) => dispatch =>
  dispatch({ type: types.TABLE_CONTENT_LOADED_COUNT, topics, supervisors })

export const finishLoading = ({ topics, supervisors }) => dispatch =>
  dispatch({ type: types.TABLE_CONTENT_FINISH_LOADING, topics, supervisors })

export const getTableContent = (params, showLoading) => dispatch => {
  if (showLoading) dispatch({ type: types.TABLE_CONTENT_STARTED_LOADING })

  const q = {
    params
  }
  return Api('GET', '/' + params.tab, q)
    .then(({ data, count, query }) => {
      dispatch({ type: types.TABLE_CONTENT_LOADED, data, count, query })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
