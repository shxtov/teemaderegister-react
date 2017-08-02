import * as types from '../../constants/ActionTypes'
import { setToken } from '../../actions/TokenActions'
import Api from '../../utils/api'

export const initLogin = () => dispatch => dispatch({ type: types.LOGIN_INIT })

export const login = creds => dispatch => {
  dispatch({ type: types.LOGIN_IN_PROGRESS })
  const query = {
    data: creds
  }
  return Api('POST', '/auth/local/login', query)
    .then(data => {
      dispatch(setToken(data.token))
      dispatch({ type: types.LOGIN_FINISHED })
    })
    .catch(err => {
      console.log(err)
      let error = err.data
      dispatch({ type: types.LOGIN_FINISHED, error })
    })
}
