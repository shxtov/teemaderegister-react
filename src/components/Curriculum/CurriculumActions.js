import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

import { loadedTableContentCount } from '../TableContent/TableContentActions'

export const initCurriculum = () => dispatch => {
  dispatch({ type: types.CURRICULUM_INIT })
}

export const getCurriculum = slug => dispatch => {
  return Api('GET', '/curriculums/' + slug)
    .then(response => {
      const { data, supervisors, topics } = response

      dispatch(loadedTableContentCount({ topics, supervisors }))
      dispatch({ type: types.CURRICULUM_LOADED, data })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
