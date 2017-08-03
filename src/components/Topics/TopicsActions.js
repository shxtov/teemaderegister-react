import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const initTopics = () => dispatch =>
  dispatch({ type: types.TOPICS_INIT })

export const loadedTopicsCount = count => dispatch =>
  dispatch({ type: types.TOPICS_LOADED_COUNT, count })

// TODO separate server side route to pass more params for filter and sort etc
export const getTopics = ({ curriculumId, tab, sub }) => dispatch => {
  dispatch({ type: types.TOPICS_STARTED_LOADING })

  const q = {
    params: {
      sub
    }
  }
  const url = '/curriculums/' + curriculumId + '/' + tab

  return Api('GET', url, q)
    .then(({ data, count, query }) => {
      dispatch({ type: types.TOPICS_LOADED, data, count, query })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
