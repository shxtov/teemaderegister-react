import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

export const getCurriculums = () => dispatch => {
  return Api('GET', '/curriculums')
    .then(curriculums =>
      dispatch({ type: types.CURRICULUMS_LOADED, curriculums })
    )
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
