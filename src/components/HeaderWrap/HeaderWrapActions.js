import Api from '../../utils/api'
import { clearToken } from '../../utils/jwt'
import * as types from '../../constants/ActionTypes'

export const logout = () => dispatch => {
  return Api('POST', '/auth/logout')
    .then(() => {
      dispatch(completeLogout())
    })
    .catch(() => {
      console.warn('already logged out')
      dispatch(completeLogout())
    })
}

const completeLogout = () => dispatch => {
  clearToken()
  dispatch({ type: types.AUTH_RESET })
}
