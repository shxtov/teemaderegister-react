import Api from '../../utils/api'
import * as types from '../../constants/ActionTypes'

import { clearToken, setToken } from '../../utils/jwt'

export const checkUser = () => {
  return dispatch => {
    dispatch({ type: types.AUTH_START })

    Api('GET', '/users/me')
      .then(data => {
        const { user, token } = data
        if (token) setToken(token)
        dispatch({ type: types.AUTH_SET, user, token })
      })
      .catch(() => {
        clearToken()
        return dispatch({ type: types.AUTH_RESET })
      })
  }
}
