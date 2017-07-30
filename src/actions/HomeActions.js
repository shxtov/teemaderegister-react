import * as types from 'constants/ActionTypes'
import Api from 'utils/api'

export function loadCurriculums() {
  return dispatch => {
    return Api('GET', '/curriculums')
      .then(curriculums => {
        dispatch({ type: types.LOADED_CURRICULUMS, curriculums })
      })
      .catch(err => {
        // TODO handle errors
        console.log(err)
      })
  }
}
