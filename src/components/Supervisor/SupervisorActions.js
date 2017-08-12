import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'

import { loadedTableContentCount } from '../TableContent/TableContentActions'

export const initSupervisor = () => dispatch => {
  dispatch({ type: types.SUPERVISOR_INIT })
}

export const getSupervisor = slug => dispatch => {
  return Api('GET', '/supervisors/' + slug)
    .then(response => {
      const { data, count } = response

      dispatch(
        loadedTableContentCount({
          topics: {
            available: count.available,
            registered: count.registered.all,
            defended: count.defended.all,
            all: count.all
          }
        })
      )
      dispatch({ type: types.SUPERVISOR_LOADED, data, count })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
