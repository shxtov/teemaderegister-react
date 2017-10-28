import * as types from '../constants/ActionTypes'
import Api from '../utils/Api'

import { loadedTableContentCount } from './TableContentActions'

export const initCurriculum = () => dispatch => {
  dispatch({ type: types.CURRICULUM_INIT })
}

export const getCurriculums = () => dispatch => {
  return Api('GET', '/curriculums')
    .then(data => dispatch({
      type: types.CURRICULUMS_LOADED,
      curriculums: data.curriculums
    }))
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}

export const getCurriculum = slug => dispatch => {
  return Api('GET', '/curriculums/' + slug)
    .then(data => {
      const { meta, supervisors, topics } = data
      dispatch(loadedTableContentCount({ topics, supervisors }))
      dispatch({ type: types.CURRICULUM_LOADED, meta })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
