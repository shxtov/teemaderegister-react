import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const initTopics = () => dispatch =>
  dispatch({ type: types.TOPICS_INIT })

export const loadedTopicsCount = count => dispatch =>
  dispatch({ type: types.TOPICS_LOADED_COUNT, count })

export const getTopics = (_id, tab, sub) => dispatch => {
  dispatch({ type: types.TOPICS_STARTED_LOADING })

  const q = {
    params: {
      sub
    }
  }
  const url = '/curriculums/' + _id + '/' + tab

  return Api('GET', url, q)
    .then(({ data, count }) => {
      dispatch({ type: types.TOPICS_LOADED, data, count, sub })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
