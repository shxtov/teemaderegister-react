import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

import { loadedTableContentCount } from '../TableContent/TableContentActions'

export const initSupervisor = () => dispatch => {
  dispatch({ type: types.SUPERVISOR_INIT })
}

export const getSupervisor = slug => dispatch => {
  return Api('GET', '/supervisors/' + slug)
    .then(({ supervisor, counts }) => {
      dispatch(
        loadedTableContentCount({
          topics: {
            available: counts.available,
            registered: counts.registered.all,
            defended: counts.defended.all,
            all: counts.all
          }
        })
      )
      dispatch({ type: types.SUPERVISOR_LOADED, supervisor, counts })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
