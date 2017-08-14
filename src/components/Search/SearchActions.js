import * as types from '../../constants/ActionTypes'
import Api from '../../utils/api'
import { loadedTableContentCount } from '../TableContent/TableContentActions'

export const initSearch = () => dispatch => {
  dispatch({ type: types.SEARCH_INIT })
}

export const setSearch = q => dispatch => {
  dispatch({ type: types.SEARCH_SET, q })
}

export const getSearchCounts = q => dispatch => {
  //dispatch({ type: types.SEARCH_STARTED_LOADING })

  return Api('GET', '/search/counts', { params: { q } })
    .then(response => {
      const { supervisors, topics } = response
      //console.log(response)

      dispatch(loadedTableContentCount({ topics, supervisors }))
      dispatch({ type: types.SEARCH_LOADED, q })
    })
    .catch(err => {
      // TODO handle errors
      console.log(err)
    })
}
