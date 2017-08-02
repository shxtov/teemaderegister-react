import * as types from 'constants/ActionTypes'
import Api from 'utils/api'
import store from 'store/configureStore'

export function initCurriculum() {
  return dispatch => {
    dispatch({ type: types.INIT_CURRICULUM_META })
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

export function getCurriculumMeta(abbreviation) {
  return dispatch => {
    return Api('GET', '/curriculums/' + abbreviation)
      .then(response => {
        const { curriculumMeta, supervisors, topics } = response
        //console.warn('META')
        dispatch({ type: types.LOADED_CURRICULUM_META, curriculumMeta })
        dispatch({
          type: types.LOADED_CURRICULUM_META_COUNTS,
          supervisors,
          topics
        })
      })
      .catch(err => {
        // TODO handle errors
        console.log(err)
      })
  }
}

export function getCurriculumData(_id, tab, sub) {
  return dispatch => {
    dispatch({ type: types.LOADING_CURRICULUM_DATA })

    //console.log(sub)
    const q = {
      params: {
        sub
      }
    }
    return Api('GET', '/curriculums/' + _id + '/' + tab, q)
      .then(results => {
        dispatch({
          type: types.LOADED_CURRICULUM_DATA,
          results,
          tab,
          sub
        })
      })
      .catch(err => {
        // TODO handle errors
        console.log(err)
      })
  }
}
