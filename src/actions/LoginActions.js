import * as types from '../constants/ActionTypes'
import { setToken } from '../utils/jwt'
import Api from '../utils/Api'

export const initLogin = () => dispatch => dispatch({ type: types.LOGIN_INIT })

export const login = creds => dispatch => {
  dispatch({ type: types.LOGIN_IN_PROGRESS })
  const query = {
    data: creds
  }
  return Api('POST', '/auth/local/login', query)
    .then(data => {
      setToken(data.token)
      dispatch({ type: types.LOGIN_FINISHED })
    })
    .catch(err => {
      console.log(err)
      const error = err.data
      dispatch({ type: types.LOGIN_FINISHED, error })
    })
}
