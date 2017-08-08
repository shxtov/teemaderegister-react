import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const initTopics = () => dispatch =>
  dispatch({ type: types.TOPICS_INIT })

export const loadedTopicsCount = count => dispatch =>
  dispatch({ type: types.TOPICS_LOADED_COUNT, count })

// TODO separate server side route to pass more params for filter and sort etc
export const getTopics = (params, showLoading) => dispatch => {
  if (showLoading) dispatch({ type: types.TOPICS_STARTED_LOADING })

  // TODO exclude local variables filters and showLoading
  // send showloading separately

  //console.log(params)
  const q = {
    params
  }

  return Api('GET', '/topics', q)
    .then(({ data, count, query }) => {
      dispatch({ type: types.TOPICS_LOADED, data, count, query })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
