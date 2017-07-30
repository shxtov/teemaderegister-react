import * as types from 'constants/ActionTypes'
import Api from 'utils/api'

export function initCurriculum() {
  return dispatch => {
    dispatch({ type: types.INIT_CURRICULUM })
  }
}

export function loadHomeCurriculums() {
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

export function getSingleCurriculumData(abbreviation) {
  return dispatch => {
    return Api('GET', '/curriculums/' + abbreviation)
      .then(curriculumMeta => {
        dispatch({
          type: types.LOADED_CURRICULUM_META,
          curriculumMeta
        })
      })
      .catch(err => {
        // TODO handle errors
        console.log(err)
      })
  }
}
